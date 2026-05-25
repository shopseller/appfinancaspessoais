import Link from 'next/link'
import { TrendingUp, BarChart2, Shield, Download, Smartphone, PieChart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: BarChart2,
    title: 'Dashboard Visual',
    description: 'Veja suas receitas, despesas e saldo em cards claros e um gráfico de categorias.',
  },
  {
    icon: PieChart,
    title: 'Categorias Inteligentes',
    description: 'Classifique automaticamente seus gastos em Alimentação, Transporte, Lazer e mais.',
  },
  {
    icon: Shield,
    title: 'Seus dados são seus',
    description: 'Autenticação segura e isolamento de dados por usuário (Row Level Security).',
  },
  {
    icon: Download,
    title: 'Exportar CSV',
    description: 'Baixe suas transações filtradas em planilha com um clique.',
  },
  {
    icon: Smartphone,
    title: 'Responsivo',
    description: 'Funciona perfeitamente no celular, tablet e desktop.',
  },
  {
    icon: TrendingUp,
    title: 'Filtros por período',
    description: 'Filtre por mês, ano, categoria ou busque por descrição.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">FinançasPro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Criar conta grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          ✨ Controle financeiro simples e visual
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
          Suas finanças pessoais,{' '}
          <span className="text-blue-600">organizadas de verdade</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          Registre receitas e despesas, visualize um dashboard completo por categoria e exporte
          relatórios. Tudo em um app rápido, seguro e totalmente gratuito.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register">
            <Button size="lg" className="px-8">
              Começar gratuitamente
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Receitas', value: 'R$ 5.200,00', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
              { label: 'Despesas', value: 'R$ 3.150,00', color: 'text-red-500', bg: 'bg-red-50 border-red-200' },
              { label: 'Saldo', value: 'R$ 2.050,00', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
            ].map(c => (
              <div key={c.label} className={`rounded-xl border p-4 ${c.bg}`}>
                <p className="text-xs text-slate-500 font-medium">{c.label}</p>
                <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            {[
              { icon: '🍽️', desc: 'Supermercado Extra', cat: 'Alimentação', val: '− R$ 245,00', color: 'text-red-500' },
              { icon: '💰', desc: 'Salário Maio', cat: 'Salário', val: '+ R$ 4.500,00', color: 'text-emerald-600' },
              { icon: '🚗', desc: 'Uber', cat: 'Transporte', val: '− R$ 32,00', color: 'text-red-500' },
              { icon: '🏠', desc: 'Aluguel', cat: 'Moradia', val: '− R$ 1.200,00', color: 'text-red-500' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{t.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.desc}</p>
                    <p className="text-xs text-slate-400">{t.cat}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.color}`}>{t.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Tudo que você precisa para controlar seu dinheiro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Pronto para organizar suas finanças?
        </h2>
        <p className="text-slate-500 mb-6">Crie sua conta gratuita em menos de 1 minuto.</p>
        <Link href="/register">
          <Button size="lg" className="px-10">
            Criar conta grátis
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6">
        <p className="text-center text-sm text-slate-400">
          © {new Date().getFullYear()} FinançasPro · Feito com Next.js + Supabase
        </p>
      </footer>
    </div>
  )
}
