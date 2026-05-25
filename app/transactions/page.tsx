'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TransactionForm } from '@/components/transactions/transaction-form'
import { TransactionList } from '@/components/transactions/transaction-list'
import { Filters } from '@/components/transactions/filters'
import { createClient } from '@/lib/supabase/client'
import {
  filterTransactions,
  exportToCSV,
  getMonthlySummary,
  formatCurrency,
  getCurrentMonthYear,
} from '@/lib/utils'
import type { Transaction, FilterState } from '@/lib/types'

const { month, year } = getCurrentMonthYear()

const DEFAULT_FILTERS: FilterState = {
  month,
  year,
  category: 'all',
  search: '',
}

export default function TransactionsPage() {
  const supabase = createClient()
  const [userId, setUserId] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Transaction | null>(null)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setUserId(user.id)
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    setTransactions((data ?? []) as Transaction[])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filtered = filterTransactions(transactions, filters)
  const summary = getMonthlySummary(filtered)

  function handleEdit(t: Transaction) {
    setEditTarget(t)
    setFormOpen(true)
  }

  function handleCloseForm() {
    setFormOpen(false)
    setEditTarget(null)
  }

  function handleExportCSV() {
    exportToCSV(filtered, 'transacoes')
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transações</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filtered.length} transaç{filtered.length !== 1 ? 'ões' : 'ão'} encontrada
            {filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={filtered.length === 0}>
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
          <Button size="sm" onClick={() => setFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Nova transação
          </Button>
        </div>
      </div>

      <Filters filters={filters} onChange={setFilters} />

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs font-medium text-emerald-600 mb-1">Receitas</p>
          <p className="text-lg font-bold text-emerald-700">{formatCurrency(summary.totalIncome)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs font-medium text-red-500 mb-1">Despesas</p>
          <p className="text-lg font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
        </div>
        <div className={`border rounded-xl p-4 ${summary.balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-xs font-medium mb-1 ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>Saldo</p>
          <p className={`text-lg font-bold ${summary.balance >= 0 ? 'text-blue-700' : 'text-red-600'}`}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 pt-2">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">Carregando...</div>
          ) : (
            <div className="px-5 pb-3">
              <TransactionList
                transactions={filtered}
                onEdit={handleEdit}
                onDeleted={loadData}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionForm
        open={formOpen}
        onClose={handleCloseForm}
        onSuccess={loadData}
        userId={userId}
        editTransaction={editTarget}
      />
    </div>
  )
}
