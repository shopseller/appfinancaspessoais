import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinançasPro — Gestão Financeira Pessoal',
  description: 'Controle suas finanças pessoais com simplicidade e clareza.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
