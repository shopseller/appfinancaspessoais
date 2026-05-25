import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Transaction, CategorySummary, MonthlySummary, FilterState } from './types'
import { CATEGORY_COLORS, getCategoryLabel } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export function getMonthlySummary(transactions: Transaction[]): MonthlySummary {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  }
}

export function getCategorySummary(transactions: Transaction[]): CategorySummary[] {
  const map: Record<string, number> = {}

  for (const t of transactions) {
    if (t.type === 'expense') {
      map[t.category] = (map[t.category] ?? 0) + t.amount
    }
  }

  return Object.entries(map)
    .map(([category, total]) => ({
      category,
      label: getCategoryLabel(category),
      total,
      color: CATEGORY_COLORS[category] ?? '#6b7280',
    }))
    .sort((a, b) => b.total - a.total)
}

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterState
): Transaction[] {
  return transactions.filter(t => {
    const [year, month] = t.date.split('-')

    if (filters.month && filters.month !== 'all' && month !== filters.month) return false
    if (filters.year && filters.year !== 'all' && year !== filters.year) return false
    if (filters.category && filters.category !== 'all' && t.category !== filters.category) return false
    if (
      filters.search &&
      !t.description.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false

    return true
  })
}

export function exportToCSV(transactions: Transaction[], filename: string = 'transacoes'): void {
  const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor']
  const rows = transactions.map(t => [
    formatDate(t.date),
    t.description,
    t.type === 'income' ? 'Receita' : 'Despesa',
    getCategoryLabel(t.category),
    t.amount.toFixed(2).replace('.', ','),
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(';'))
    .join('\n')

  const BOM = '﻿'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function getCurrentMonthYear() {
  const now = new Date()
  return {
    month: String(now.getMonth() + 1).padStart(2, '0'),
    year: String(now.getFullYear()),
  }
}
