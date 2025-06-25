import React from 'react'
import { FileCode, Shield, Zap, Play } from 'lucide-react'

interface Props {
  code: string
  setCode: (c: string) => void
  language: string
  setLanguage: (l: string) => void
  languages: { value: string; label: string }[]
  isAnalyzing: boolean
  handleAnalyze: () => void
}

export default function CodeEditor({
  code, setCode, language, setLanguage,
  languages, isAnalyzing, handleAnalyze,
}: Props) {
  return (
    <div className="flex-1 flex flex-col bg-gray-900/30 rounded-tl-2xl">
      <div className="flex items-center justify-between p-4 bg-gray-800/30 border-b border-gray-700/50 rounded-tl-2xl">
        <div className="flex items-center gap-3 text-gray-200">
          <FileCode className="w-5 h-5 text-blue-400" />
          <span className="font-medium">Code Editor</span>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="ml-4 px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-sm focus:outline-none focus:border-blue-500/50"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{code.length} chars</span>
          <span>•</span>
          <span>{code.split('\n').length} lines</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="// Paste your code here..."
          className="w-full h-full pl-14 pr-6 py-6 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none placeholder-gray-600 leading-relaxed overflow-auto"
          spellCheck={false}
        />
        <div className="absolute left-0 top-0 w-12 h-full bg-gray-900/50 border-r border-gray-800/50 overflow-hidden">
          <div className="py-6 px-2 flex flex-col text-xs text-gray-600 font-mono select-none">
            {Array.from({ length: Math.max(20, code.split('\n').length) }, (_, i) => (
              <div key={i} className="h-5 leading-relaxed text-right pr-2">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800/30 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Real-time</span>
          </div>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!code.trim() || isAnalyzing}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>
    </div>
  )
}
