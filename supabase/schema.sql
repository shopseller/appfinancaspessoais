-- Tabela de transações
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount decimal(10, 2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null
);

-- Índices para performance
create index if not exists transactions_user_id_idx on transactions(user_id);
create index if not exists transactions_date_idx on transactions(date);
create index if not exists transactions_type_idx on transactions(type);

-- Row Level Security
alter table transactions enable row level security;

-- Política: cada usuário só vê e gerencia suas próprias transações
create policy "Users can view their own transactions"
  on transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on transactions for delete
  using (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create trigger update_transactions_updated_at
  before update on transactions
  for each row
  execute function update_updated_at_column();
