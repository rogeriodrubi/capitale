-- Create the properties table
create table public.properties (
  id text primary key,
  title text not null,
  location text not null,
  area numeric not null,
  price numeric not null,
  type text not null check (type in ('terreno', 'imovel')),
  description text not null,
  features text[] not null default '{}',
  images text[] not null default '{}',
  coordinates jsonb not null,
  contact text not null,
  availability boolean not null default true,
  featured boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.properties enable row level security;

-- Create a policy that allows read access to everyone
create policy "Enable read access for all users"
on public.properties for select
to anon
using (true);

-- Create a policy that allows insert/update/delete only for authenticated users (or service role)
-- For the seed script, we will simply use the public anon key for now if RLS allows insert, 
-- or better, the user should run this SQL then we use the service_role key if we had it, 
-- but usually we just want to allow Anon to read.
-- For seeding efficiently without Service Key in client-side, we might temporarily allow insert to anon 
-- OR strictly use the Table Editor to import CSV.
-- BUT, for the API route approach, the server-side client can theoretically bypass RLS if we set it up right, 
-- but standard createClient uses the public anon key by default unless configured otherwise.
-- Let's stick to standard RLS: Public Read.
-- For Seeding: We will temporarily allow Anon Insert to run the seed, then remove it.
-- OR instruct user to run the INSERTs via SQL editor.

-- OPTION B: SEED VIA SQL
-- Since I have the data, I can just generate a huge INSERT .sql file. This is often cleaner/safer than an API route that might timeout or fail auth.

