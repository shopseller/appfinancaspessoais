export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  category: string
  created_at: string
  updated_at: string
}

export interface TransactionFormData {
  description: string
  amount: string
  date: string
  type: TransactionType
  category: string
}

export interface CategorySummary {
  category: string
  label: string
  total: number
  color: string
}

export interface MonthlySummary {
  totalIncome: number
  totalExpenses: number
  balance: number
}

export interface FilterState {
  month: string
  year: string
  category: string
  search: string
}
