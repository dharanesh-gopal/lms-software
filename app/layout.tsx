import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Tamil } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _notoTamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'KalviPlus - Tamil Nadu Learning Management System',
  description: 'Bilingual Learning Management System for 10th and 12th Standard students in Tamil Nadu. Supports Tamil and English medium.',
}

export const viewport: Viewport = {
  themeColor: '#1e6cb6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_notoTamil.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
