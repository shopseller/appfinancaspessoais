'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES, MONTHS } from '@/lib/constants'
import type { FilterState } from '@/lib/types'

interface FiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function Filters({ filters, onChange }: FiltersProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => String(currentYear - i))

  function update(field: keyof FilterState, value: string) {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Buscar por descrição..."
          value={filters.search}
          onChange={e => update('search', e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={filters.month} onValueChange={v => update('month', v)}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os meses</SelectItem>
          {MONTHS.map(m => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.year} onValueChange={v => update('year', v)}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {years.map(y => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={v => update('category', v)}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {CATEGORIES.map(c => (
            <SelectItem key={c.value} value={c.value}>
              {c.icon} {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
