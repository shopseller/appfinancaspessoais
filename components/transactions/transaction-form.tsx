'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIES } from '@/lib/constants'
import type { Transaction, TransactionFormData } from '@/lib/types'

interface TransactionFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  userId: string
  editTransaction?: Transaction | null
}

const defaultForm: TransactionFormData = {
  description: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
  category: 'outros',
}

export function TransactionForm({
  open,
  onClose,
  onSuccess,
  userId,
  editTransaction,
}: TransactionFormProps) {
  const supabase = createClient()
  const [form, setForm] = useState<TransactionFormData>(
    editTransaction
      ? {
          description: editTransaction.description,
          amount: String(editTransaction.amount),
          date: editTransaction.date,
          type: editTransaction.type,
          category: editTransaction.category,
        }
      : defaultForm
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(field: keyof TransactionFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const amount = parseFloat(form.amount.replace(',', '.'))
    if (isNaN(amount) || amount <= 0) {
      setError('Informe um valor válido e positivo.')
      setLoading(false)
      return
    }

    const payload = {
      description: form.description.trim(),
      amount,
      date: form.date,
      type: form.type,
      category: form.category,
      user_id: userId,
    }

    let error
    if (editTransaction) {
      const result = await supabase
        .from('transactions')
        .update(payload)
        .eq('id', editTransaction.id)
      error = result.error
    } else {
      const result = await supabase.from('transactions').insert(payload)
      error = result.error
    }

    if (error) {
      setError('Erro ao salvar. Tente novamente.')
      setLoading(false)
      return
    }

    onSuccess()
    onClose()
    if (!editTransaction) setForm(defaultForm)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editTransaction ? 'Editar Transação' : 'Nova Transação'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChange('type', 'expense')}
              className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                form.type === 'expense'
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-red-50'
              }`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => handleChange('type', 'income')}
              className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                form.type === 'income'
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-emerald-50'
              }`}
            >
              Receita
            </button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado, Salário..."
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                placeholder="0,00"
                value={form.amount}
                onChange={e => handleChange('amount', e.target.value)}
                required
                inputMode="decimal"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={e => handleChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={v => handleChange('category', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.icon} {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : editTransaction ? (
                'Salvar alterações'
              ) : (
                'Adicionar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
