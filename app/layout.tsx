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
  title: 'Younes Ait Braym | Développeur Full Stack & Mobile',
  description: 'Portfolio de Younes Ait Braym, développeur Full Stack & Mobile basé à Casablanca, Maroc. Spécialisé en React, Next.js, React Native, Spring Boot.',
  keywords: 'Younes Ait Braym, Tazalt, EMSI, développeur full stack, développeur mobile, React, Next.js, React Native, Casablanca, Maroc',
  authors: [{ name: 'Younes Ait Braym' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Younes Ait Braym | Développeur Full Stack & Mobile',
    description: 'Portfolio de Younes Ait Braym, développeur Full Stack & Mobile basé à Casablanca, Maroc.',
    url: 'https://younesaitbraym.com',
    siteName: 'Younes Ait Braym Portfolio',
    locale: 'fr_FR',
    type: 'website',
  },
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
