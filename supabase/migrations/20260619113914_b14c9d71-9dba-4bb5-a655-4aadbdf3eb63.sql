
CREATE TABLE public.beneficiary_documents (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references public.beneficiaries(id) on delete cascade,
  user_id uuid not null,
  doc_type text not null,
  file_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  notes text,
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.beneficiary_documents TO authenticated;
GRANT ALL ON public.beneficiary_documents TO service_role;

ALTER TABLE public.beneficiary_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner or state/admin can view docs"
  ON public.beneficiary_documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'state') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Owner inserts own docs"
  ON public.beneficiary_documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner deletes own docs"
  ON public.beneficiary_documents FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "State/admin can update beneficiary status"
  ON public.beneficiaries FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'state') OR has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'state') OR has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.claim_state_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  INSERT INTO public.user_roles(user_id, role)
  VALUES (auth.uid(), 'state')
  ON CONFLICT DO NOTHING;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_state_role() TO authenticated;

-- Storage policies for the beneficiary-docs bucket (created via storage tool).
-- Files are stored under <user_id>/<filename>.
CREATE POLICY "Owner can read own beneficiary files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'beneficiary-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "State/admin can read all beneficiary files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'beneficiary-docs' AND (has_role(auth.uid(), 'state') OR has_role(auth.uid(), 'admin')));

CREATE POLICY "Owner can upload own beneficiary files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'beneficiary-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Owner can delete own beneficiary files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'beneficiary-docs' AND auth.uid()::text = (storage.foldername(name))[1]);
