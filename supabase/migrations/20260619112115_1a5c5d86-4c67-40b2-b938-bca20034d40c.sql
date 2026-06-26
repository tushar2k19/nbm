
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'state', 'beneficiary');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Beneficiary registrations (NBM, MIDH-style fields)
CREATE TABLE public.beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Personal
  full_name TEXT NOT NULL,
  father_husband_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  category TEXT NOT NULL,  -- General/SC/ST/OBC
  aadhaar_no TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  -- Address
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  block TEXT NOT NULL,
  gram_panchayat TEXT,
  village TEXT NOT NULL,
  pincode TEXT NOT NULL,
  -- Land
  khasra_no TEXT,
  total_land_area_ha NUMERIC(10,3) NOT NULL,
  area_under_bamboo_ha NUMERIC(10,3) NOT NULL,
  land_type TEXT, -- Own/Leased/Forest
  -- Crop / Component
  component TEXT NOT NULL, -- Plantation/Nursery/Processing/etc.
  bamboo_species TEXT,
  year_of_plantation INTEGER,
  spacing TEXT,
  -- Bank
  bank_name TEXT NOT NULL,
  bank_branch TEXT NOT NULL,
  account_no TEXT NOT NULL,
  ifsc TEXT NOT NULL,
  -- Meta
  status TEXT NOT NULL DEFAULT 'pending',
  registration_no TEXT NOT NULL DEFAULT ('NBM-' || to_char(now(), 'YYYY') || '-' || upper(substring(replace(gen_random_uuid()::text,'-',''),1,8))),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.beneficiaries TO authenticated;
GRANT ALL ON public.beneficiaries TO service_role;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Beneficiary views own record" ON public.beneficiaries FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'state') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Beneficiary inserts own record" ON public.beneficiaries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Beneficiary updates own record" ON public.beneficiaries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER beneficiaries_set_updated_at BEFORE UPDATE ON public.beneficiaries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-assign beneficiary role on signup (default)
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'beneficiary')
    ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
