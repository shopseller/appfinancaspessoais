'use client'

import { useState } from 'react'
import { Pencil, Trash2, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getCategoryIcon, getCategoryLabel } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import type { Transaction } from '@/lib/types'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDeleted: () => void
}

export function TransactionList({ transactions, onEdit, onDeleted }: TransactionListProps) {
  const supabase = createClient()
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('transactions').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    setDeleting(false)
    onDeleted()
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="font-medium">Nenhuma transação encontrada</p>
        <p className="text-sm mt-1">Tente ajustar os filtros ou adicione uma nova transação</p>
      </div>
    )
  }

  return (
    <>
      <div className="divide-y divide-slate-100">
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between py-3 px-1 group">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl">{getCategoryIcon(t.category)}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400">{formatDate(t.date)}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryLabel(t.category)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4 shrink-0">
              <span
                className={`text-sm font-bold ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {t.type === 'income' ? '+' : '−'} {formatCurrency(t.amount)}
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-blue-600"
                  onClick={() => onEdit(t)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-red-500"
                  onClick={() => setDeleteTarget(t)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir transação?</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm">
            A transação{' '}
            <span className="font-semibold text-slate-700">
              &quot;{deleteTarget?.description}&quot;
            </span>{' '}
            será removida permanentemente.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
