import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Younes Ait Braym — Portfolio',
  description: 'Élève-Ingénieur Full Stack | EMSI Casablanca',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-inter)] bg-[#0a0a0a] text-white antialiased" suppressHydrationWarning>
        <CustomCursor />
        <LenisProvider />
        {children}
      </body>
    </html>
  )
}
