CREATE TABLE IF NOT EXISTS public.signup_emails (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying not null,
  email character varying not null
);

-- 1. Enable RLS
ALTER TABLE public.signup_emails ENABLE ROW LEVEL SECURITY;

-- 2. Create Policy for SELECT
CREATE POLICY select_all_policy ON public.signup_emails FOR
SELECT USING (TRUE);

-- 3. Create Policy for INSERT
CREATE POLICY insert_auth_policy ON public.signup_emails FOR
INSERT WITH CHECK (TRUE);

-- 4. Create Policy for UPDATE
CREATE POLICY update_auth_policy ON public.signup_emails FOR
UPDATE WITH CHECK (FALSE);
