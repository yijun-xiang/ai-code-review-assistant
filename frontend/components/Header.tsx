import React from 'react'
import { Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-blue-400">AI Code Analyzer</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Online</span>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Smart Code Analysis
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          AI-powered code review and optimization
        </p>
      </div>
      <div className="text-sm text-gray-400">Powered by Advanced AI</div>
    </header>
  )
}
