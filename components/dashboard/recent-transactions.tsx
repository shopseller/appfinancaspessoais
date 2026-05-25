import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getCategoryIcon, getCategoryLabel } from '@/lib/constants'
import type { Transaction } from '@/lib/types'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Últimas Transações</CardTitle>
        <Link
          href="/transactions"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
        >
          Ver todas <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {recent.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">
            Nenhuma transação registrada
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map(t => (
              <div key={t.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl">{getCategoryIcon(t.category)}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{t.description}</p>
                    <p className="text-xs text-slate-400">
                      {getCategoryLabel(t.category)} · {formatDate(t.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span
                    className={`text-sm font-semibold ${
                      t.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                  <Badge variant={t.type === 'income' ? 'income' : 'expense'}>
                    {t.type === 'income' ? 'Receita' : 'Despesa'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
