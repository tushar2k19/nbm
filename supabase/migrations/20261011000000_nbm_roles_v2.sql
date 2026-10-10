-- =============================================================
-- NBM Role-Based Portal — Core Schema (v2)
-- =============================================================
-- New role system: state_editor, state_reviewer, nbm_central
-- Replaces the old admin/state/beneficiary model.
-- =============================================================

-- 1. New role enum
CREATE TYPE public.nbm_role AS ENUM ('state_editor', 'state_reviewer', 'nbm_central');

-- 2. State users (profile table for portal users)
CREATE TABLE public.state_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  state_code TEXT,           -- ISO 3166-2:IN code (e.g. 'MH', 'DL'); NULL for nbm_central
  role public.nbm_role NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.state_users ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.state_users TO authenticated;
GRANT ALL ON public.state_users TO service_role;

-- RLS: users see own profile; nbm_central sees all
CREATE POLICY "Users view own state_users profile"
  ON public.state_users FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.state_users su
      WHERE su.user_id = auth.uid() AND su.role = 'nbm_central' AND su.is_active = true
    )
  );

-- Only service_role (admin API) can INSERT/UPDATE/DELETE state_users
-- (NBM central uses server functions to manage users)
CREATE POLICY "Service role manages state_users"
  ON public.state_users FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Trigger: auto-update updated_at
CREATE TRIGGER state_users_set_updated_at
  BEFORE UPDATE ON public.state_users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Helper: check if a user has a specific NBM role
CREATE OR REPLACE FUNCTION public.has_nbm_role(_user_id UUID, _role public.nbm_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.state_users
    WHERE user_id = _user_id AND role = _role AND is_active = true
  );
$$;
GRANT EXECUTE ON FUNCTION public.has_nbm_role(UUID, public.nbm_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.has_nbm_role(UUID, public.nbm_role) FROM PUBLIC, anon;

-- Helper: get the state_code for a user
CREATE OR REPLACE FUNCTION public.get_user_state_code(_user_id UUID)
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT state_code FROM public.state_users
  WHERE user_id = _user_id AND is_active = true
  LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION public.get_user_state_code(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_user_state_code(UUID) FROM PUBLIC, anon;

-- 3. Monthly entries (core data)
CREATE TABLE public.monthly_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code TEXT NOT NULL,
  month_year DATE NOT NULL,             -- stored as 1st of month, e.g. 2025-09-01
  activity TEXT NOT NULL,
  beneficiary_name TEXT NOT NULL,
  beneficiary_type TEXT NOT NULL,
  father_husband_name TEXT,             -- NULL unless beneficiary_type = 'Individual'
  gender TEXT,
  age INTEGER,
  category TEXT,
  mobile TEXT,
  village TEXT,
  block TEXT,
  district TEXT,
  state TEXT,
  pin_code TEXT,
  total_project_investment_lakhs NUMERIC(12,2),
  center_share_lakhs NUMERIC(12,2),
  state_share_lakhs NUMERIC(12,2),
  total_capacity TEXT,
  employment_generated INTEGER,
  -- Workflow
  status TEXT NOT NULL DEFAULT 'draft',  -- draft|submitted|under_review|approved|declined|revision_requested
  submitted_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.monthly_entries ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.monthly_entries TO authenticated;
GRANT ALL ON public.monthly_entries TO service_role;

-- RLS: editors see/edit own state entries
CREATE POLICY "Editor manages own state entries"
  ON public.monthly_entries FOR ALL TO authenticated
  USING (
    public.has_nbm_role(auth.uid(), 'state_editor')
    AND state_code = public.get_user_state_code(auth.uid())
  )
  WITH CHECK (
    public.has_nbm_role(auth.uid(), 'state_editor')
    AND state_code = public.get_user_state_code(auth.uid())
  );

-- RLS: reviewers see/update own state entries
CREATE POLICY "Reviewer views and updates own state entries"
  ON public.monthly_entries FOR ALL TO authenticated
  USING (
    public.has_nbm_role(auth.uid(), 'state_reviewer')
    AND state_code = public.get_user_state_code(auth.uid())
  )
  WITH CHECK (
    public.has_nbm_role(auth.uid(), 'state_reviewer')
    AND state_code = public.get_user_state_code(auth.uid())
  );

-- RLS: nbm_central sees all entries (read-only via policy; writes via service_role if needed)
CREATE POLICY "Central views all entries"
  ON public.monthly_entries FOR SELECT TO authenticated
  USING (public.has_nbm_role(auth.uid(), 'nbm_central'));

CREATE TRIGGER monthly_entries_set_updated_at
  BEFORE UPDATE ON public.monthly_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Entry comments (threaded)
CREATE TABLE public.entry_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES public.monthly_entries(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  author_role TEXT NOT NULL,
  message TEXT NOT NULL,
  parent_id UUID REFERENCES public.entry_comments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.entry_comments ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT ON public.entry_comments TO authenticated;
GRANT ALL ON public.entry_comments TO service_role;

-- Comments are visible to anyone who can see the entry (same state or central)
CREATE POLICY "View comments for accessible entries"
  ON public.entry_comments FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.monthly_entries me
      WHERE me.id = entry_id
      AND (
        me.state_code = public.get_user_state_code(auth.uid())
        OR public.has_nbm_role(auth.uid(), 'nbm_central')
      )
    )
  );

CREATE POLICY "Insert comments on accessible entries"
  ON public.entry_comments FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = author_id
    AND EXISTS (
      SELECT 1 FROM public.monthly_entries me
      WHERE me.id = entry_id
      AND (
        me.state_code = public.get_user_state_code(auth.uid())
        OR public.has_nbm_role(auth.uid(), 'nbm_central')
      )
    )
  );

-- 5. Reminders (sent by NBM central)
CREATE TABLE public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_by UUID NOT NULL REFERENCES auth.users(id),
  target_state_code TEXT,
  target_user_id UUID REFERENCES auth.users(id),
  month_year DATE,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.reminders TO authenticated;
GRANT ALL ON public.reminders TO service_role;

-- Central can insert and see all
CREATE POLICY "Central manages reminders"
  ON public.reminders FOR ALL TO authenticated
  USING (public.has_nbm_role(auth.uid(), 'nbm_central'))
  WITH CHECK (public.has_nbm_role(auth.uid(), 'nbm_central'));

-- State users see reminders targeted to them or their state
CREATE POLICY "State users view own reminders"
  ON public.reminders FOR SELECT TO authenticated
  USING (
    target_user_id = auth.uid()
    OR target_state_code = public.get_user_state_code(auth.uid())
  );

-- State users can mark reminders as read
CREATE POLICY "State users can mark reminders read"
  ON public.reminders FOR UPDATE TO authenticated
  USING (
    target_user_id = auth.uid()
    OR target_state_code = public.get_user_state_code(auth.uid())
  )
  WITH CHECK (
    target_user_id = auth.uid()
    OR target_state_code = public.get_user_state_code(auth.uid())
  );

-- 6. Submission cycles (monthly progress per state)
CREATE TABLE public.submission_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code TEXT NOT NULL,
  month_year DATE NOT NULL,
  editor_deadline DATE NOT NULL,      -- 7th of following month
  reviewer_deadline DATE NOT NULL,    -- 15th of following month
  editor_submitted_at TIMESTAMPTZ,
  reviewer_finalised_at TIMESTAMPTZ,
  overall_status TEXT NOT NULL DEFAULT 'pending_editor',
  -- pending_editor | pending_reviewer | approved | partial
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(state_code, month_year)
);

ALTER TABLE public.submission_cycles ENABLE ROW LEVEL SECURITY;
GRANT SELECT, UPDATE ON public.submission_cycles TO authenticated;
GRANT ALL ON public.submission_cycles TO service_role;

CREATE POLICY "State users view own cycles"
  ON public.submission_cycles FOR SELECT TO authenticated
  USING (
    state_code = public.get_user_state_code(auth.uid())
    OR public.has_nbm_role(auth.uid(), 'nbm_central')
  );

CREATE POLICY "Central can update cycles"
  ON public.submission_cycles FOR UPDATE TO authenticated
  USING (public.has_nbm_role(auth.uid(), 'nbm_central'))
  WITH CHECK (public.has_nbm_role(auth.uid(), 'nbm_central'));

CREATE TRIGGER submission_cycles_set_updated_at
  BEFORE UPDATE ON public.submission_cycles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
