import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Code Review Assistant - Smart Code Analysis Tool',
  description: 'AI-powered code review and optimization tool that helps you write better, more secure code.',
  keywords: 'code review, ai code analysis, code optimization, security analysis, AI assistant, OpenAI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-black text-gray-100 overflow-hidden`}>
        <div className="gradient-bg" />
        <div className="relative z-10 h-full">
          {children}
        </div>
      </body>
    </html>
  );
}