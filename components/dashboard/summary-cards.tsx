import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import type { MonthlySummary } from '@/lib/types'

interface SummaryCardsProps {
  summary: MonthlySummary
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Receitas',
      value: summary.totalIncome,
      icon: TrendingUp,
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200',
    },
    {
      title: 'Despesas',
      value: summary.totalExpenses,
      icon: TrendingDown,
      colorClass: 'text-red-500',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
    },
    {
      title: 'Saldo',
      value: summary.balance,
      icon: Wallet,
      colorClass: summary.balance >= 0 ? 'text-blue-600' : 'text-red-500',
      bgClass: summary.balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      borderClass: summary.balance >= 0 ? 'border-blue-200' : 'border-red-200',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(card => {
        const Icon = card.icon
        return (
          <Card key={card.title} className={`border ${card.borderClass}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <p className={`text-2xl font-bold mt-1 ${card.colorClass}`}>
                    {formatCurrency(card.value)}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${card.bgClass}`}>
                  <Icon className={`w-5 h-5 ${card.colorClass}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
