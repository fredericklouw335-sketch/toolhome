
create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  city text,
  rating numeric(2,1) default 5.0,
  created_at timestamptz default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  price_zar integer not null check (price_zar >= 0),
  condition text,
  city text,
  latitude double precision,
  longitude double precision,
  status text default 'active' check (status in ('active','reserved','sold','removed')),
  created_at timestamptz default now()
);

create table if not exists listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade,
  storage_path text not null,
  sort_order integer default 0
);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade,
  buyer_id uuid references profiles(id) on delete cascade,
  amount_zar integer not null check (amount_zar > 0),
  status text default 'pending' check (status in ('pending','accepted','rejected','withdrawn','expired')),
  created_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete set null,
  buyer_id uuid references profiles(id) on delete cascade,
  seller_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete restrict,
  buyer_id uuid references profiles(id) on delete restrict,
  seller_id uuid references profiles(id) on delete restrict,
  amount_zar integer not null,
  platform_fee_zar integer default 0,
  payment_status text default 'pending',
  fulfilment text default 'collection',
  status text default 'pending',
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table listings enable row level security;
alter table listing_images enable row level security;
alter table offers enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table orders enable row level security;

create policy "public active listings" on listings for select using (status='active');
create policy "users create own listings" on listings for insert with check (auth.uid()=seller_id);
create policy "users update own listings" on listings for update using (auth.uid()=seller_id);
create policy "users delete own listings" on listings for delete using (auth.uid()=seller_id);

create policy "public profiles" on profiles for select using (true);
create policy "own profile insert" on profiles for insert with check (auth.uid()=id);
create policy "own profile update" on profiles for update using (auth.uid()=id);

create policy "buyers create offers" on offers for insert with check (auth.uid()=buyer_id);
create policy "participants view offers" on offers for select using (
  auth.uid()=buyer_id or auth.uid()=(select seller_id from listings where listings.id=offers.listing_id)
);

create policy "conversation participants" on conversations for select using (auth.uid()=buyer_id or auth.uid()=seller_id);
create policy "participants send messages" on messages for insert with check (
  auth.uid()=sender_id and auth.uid() in (
    select buyer_id from conversations where conversations.id=conversation_id
    union select seller_id from conversations where conversations.id=conversation_id
  )
);
create policy "participants read messages" on messages for select using (
  auth.uid() in (
    select buyer_id from conversations where conversations.id=conversation_id
    union select seller_id from conversations where conversations.id=conversation_id
  )
);


-- Production bootstrap additions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email,''),'@',1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

grant select on public.listings to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant select, insert, update, delete on public.listings to authenticated;
grant select, insert on public.offers to authenticated;
grant select, insert on public.conversations to authenticated;
grant select, insert on public.messages to authenticated;
grant select, insert on public.orders to authenticated;

insert into storage.buckets (id, name, public)
values ('listing-images','listing-images',true)
on conflict (id) do nothing;

create policy "listing image public read" on storage.objects for select
using (bucket_id='listing-images');

create policy "users upload listing images" on storage.objects for insert
to authenticated
with check (bucket_id='listing-images' and (storage.foldername(name))[1]=auth.uid()::text);
