import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { CategoryChart } from '@/components/dashboard/category-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { getMonthlySummary, getCategorySummary, getCurrentMonthYear } from '@/lib/utils'
import { MONTHS } from '@/lib/constants'
import type { Transaction } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { month, year } = getCurrentMonthYear()

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', `${year}-${month}-01`)
    .lte('date', `${year}-${month}-31`)
    .order('date', { ascending: false })

  const allTransactions = (transactions ?? []) as Transaction[]
  const summary = getMonthlySummary(allTransactions)
  const categorySummary = getCategorySummary(allTransactions)

  const monthLabel = MONTHS.find(m => m.value === month)?.label ?? month

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Resumo de {monthLabel} de {year}
        </p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryChart data={categorySummary} />
        <RecentTransactions transactions={allTransactions} />
      </div>
    </div>
  )
}
