CREATE TABLE public.scorecard_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  score integer NOT NULL DEFAULT 0,
  band text NOT NULL DEFAULT 'unknown',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.scorecard_submissions TO anon;
GRANT INSERT ON public.scorecard_submissions TO authenticated;
GRANT ALL ON public.scorecard_submissions TO service_role;

ALTER TABLE public.scorecard_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waiting list"
ON public.scorecard_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email LIKE '%_@_%.__%'
  AND (name IS NULL OR char_length(name) <= 100)
  AND score BETWEEN 0 AND 100
);

CREATE INDEX scorecard_submissions_created_at_idx ON public.scorecard_submissions (created_at DESC);