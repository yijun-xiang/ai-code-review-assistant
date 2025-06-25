import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Code Analyzer - Smart Code Analysis',
  description: 'AI-powered code review and optimization tool',
  keywords: 'code review, AI, code analysis, security, performance',
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
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
        {children}
      </body>
    </html>
  )
}
