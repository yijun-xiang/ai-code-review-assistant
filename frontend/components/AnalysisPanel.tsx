import React from 'react'
import {
  Brain, AlertCircle, Zap, Shield as ShieldIcon,
  Terminal, Sparkles,
} from 'lucide-react'
import SuggestionCard from './SuggestionCard'
import Spinner from './Spinner'
import type { ReviewSuggestion } from '@/lib/api'

interface Props {
  isAnalyzing: boolean
  error: string | null
  overallScore: number | null
  summary: string | null
  suggestions: ReviewSuggestion[] | null
}

export default function AnalysisPanel({
  isAnalyzing, error, overallScore, summary, suggestions,
}: Props) {
  return (
    <div className="w-[450px] flex flex-col bg-gray-900/30 rounded-tr-2xl">
      <div className="flex items-center gap-3 p-4 bg-gray-800/30 border-b border-gray-700/50 rounded-tr-2xl">
        <Brain className="w-5 h-5 text-purple-400" />
        <span className="font-medium text-gray-200">AI Analysis</span>
        {isAnalyzing && (
          <div className="ml-auto flex items-center gap-2 text-sm text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Processing
          </div>
        )}
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {error ? (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="text-sm text-red-300">{error}</div>
            </div>
          </div>
        ) : isAnalyzing ? (
          <Spinner />
        ) : overallScore !== null && suggestions ? (
          <>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/30 mb-6">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
                  <circle
                    cx="64" cy="64" r="56"
                    stroke="currentColor" strokeWidth="8" fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallScore / 10)}`}
                    className="text-blue-400 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-3xl font-bold text-white">{overallScore}</div>
                    <div className="text-xs text-gray-400">out of 10</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300">{summary}</p>
            </div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Suggestions & Issues</h4>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <SuggestionCard key={i} suggestion={s} />
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-2 border-gray-600 rounded-full flex items-center justify-center bg-gray-800/30">
                  <Terminal className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ready for Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                  Add your code in the editor to get AI-powered insights
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300 mb-3">What you'll get:</h4>
              {[
                { icon: ShieldIcon, title: 'Security Analysis', desc: 'Detect vulnerabilities and security issues' },
                { icon: Zap,       title: 'Performance Optimization', desc: 'Find bottlenecks and improve speed' },
                { icon: Brain,     title: 'Smart Suggestions',      desc: 'AI-powered code improvements' },
              ].map((f, i) => (
                <div key={i} className="p-4 bg-gray-800/20 rounded-xl border border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      i === 0 ? 'text-green-400 bg-green-500/10'
                    : i === 1 ? 'text-yellow-400 bg-yellow-500/10'
                    : 'text-purple-400 bg-purple-500/10'}`}>
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{f.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-400">Pro Tip</div>
                  <div className="text-xs text-gray-400 mt-1">
                    For best results, paste complete functions or code blocks
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
