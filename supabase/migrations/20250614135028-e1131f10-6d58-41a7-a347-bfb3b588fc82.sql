
-- Add new fields to the users table for enhanced profile information

ALTER TABLE public.users
  ADD COLUMN age integer,
  ADD COLUMN date_of_birth date,
  ADD COLUMN phone text,
  ADD COLUMN location text,
  ADD COLUMN linkedin_url text,
  ADD COLUMN bio text,
  ADD COLUMN avatar_url text;
