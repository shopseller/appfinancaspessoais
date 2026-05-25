# FinançasPro — Gestão Financeira Pessoal

App web para controle de finanças pessoais com dashboard visual, CRUD de transações, filtros e exportação CSV.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS · Supabase · Recharts

## Configuração

### 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o conteúdo de `supabase/schema.sql`
3. Copie a **URL** e a **anon key** do projeto (Settings → API)

### 2. Variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Preencha `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 3. Instalar e rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- **Autenticação** — Login e cadastro com e-mail/senha (Supabase Auth)
- **Dashboard** — Cards de Receitas, Despesas e Saldo + Gráfico de pizza por categoria
- **Transações** — Criar, editar e excluir com descrição, valor, data, tipo e categoria
- **Categorias** — Alimentação, Transporte, Moradia, Lazer, Saúde, Educação, Salário, Freelance, Outros
- **Filtros** — Por mês, ano, categoria e busca por descrição
- **CSV** — Exportar transações filtradas
- **Responsivo** — Sidebar desktop + nav mobile

## Deploy na Vercel

1. Conecte o repositório GitHub na Vercel
2. Adicione as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!
