export const CATEGORIES = [
  { value: 'alimentacao', label: 'Alimentação', icon: '🍽️' },
  { value: 'transporte', label: 'Transporte', icon: '🚗' },
  { value: 'moradia', label: 'Moradia', icon: '🏠' },
  { value: 'lazer', label: 'Lazer', icon: '🎮' },
  { value: 'saude', label: 'Saúde', icon: '❤️' },
  { value: 'educacao', label: 'Educação', icon: '📚' },
  { value: 'salario', label: 'Salário', icon: '💰' },
  { value: 'freelance', label: 'Freelance', icon: '💻' },
  { value: 'outros', label: 'Outros', icon: '📦' },
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  alimentacao: '#f59e0b',
  transporte: '#3b82f6',
  moradia: '#8b5cf6',
  lazer: '#ec4899',
  saude: '#ef4444',
  educacao: '#06b6d4',
  salario: '#22c55e',
  freelance: '#10b981',
  outros: '#6b7280',
}

export const MONTHS = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export function getCategoryLabel(value: string): string {
  return CATEGORIES.find(c => c.value === value)?.label ?? value
}

export function getCategoryIcon(value: string): string {
  return CATEGORIES.find(c => c.value === value)?.icon ?? '📦'
}
