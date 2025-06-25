'use client'

import { useState } from 'react'
import { Code2 } from 'lucide-react'

export default function Home() {
  const [code, setCode] = useState('')

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <Code2 className="w-10 h-10 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Code Review Assistant
              </h1>
              <p className="text-gray-400">
                Powered by advanced AI
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Code Input
            </h2>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-64 p-4 bg-black border border-gray-600 rounded text-white font-mono text-sm resize-none focus:outline-none focus:border-cyan-500"
              spellCheck={false}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {code.length} characters
              </span>
              <button
                onClick={() => alert('Code review feature coming soon!')}
                className="px-6 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
              >
                Review Code
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Review Results</h2>
            <p className="text-gray-400">
              Submit your code to see AI-powered insights
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}