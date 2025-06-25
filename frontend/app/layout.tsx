import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AI Code Review Assistant - Powered by Advanced AI',
  description: 'Get instant AI-powered code reviews with smart suggestions, security analysis, and performance optimization tips.',
  keywords: 'code review, AI, programming, code analysis, security, performance',
  authors: [{ name: 'AI Code Review Team' }],
  openGraph: {
    title: 'AI Code Review Assistant',
    description: 'Advanced AI-powered code analysis and review',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Code Review Assistant',
    description: 'Advanced AI-powered code analysis and review',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}