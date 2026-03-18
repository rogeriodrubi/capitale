create table public.properties (
  -- Campos Originais
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  price numeric not null,
  area numeric not null,
  description text not null,
  folder_id text not null unique,
  availability boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),

  -- Novos campos baseados no types.ts
  bedrooms numeric, 
  featured boolean default false,
  contact text,
  
  -- Enum para tipo de anúncio (venda ou aluguel)
  listing_type text check (listing_type in ('venda', 'aluguel')),
  
  -- Categoria do imóvel
  property_category text, 
  
  -- Array de strings para as características (features)
  features text[] default '{}'
);

-- Habilitar RLS (Segurança)
alter table public.properties enable row level security;

-- Política de leitura para todos
create policy "Enable read access for all users"
on public.properties for select
to anon
using (true);