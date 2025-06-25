import React from 'react'
import {
  AlertCircle, Zap, Code2, Shield as ShieldIcon,
  Info, XCircle, CheckCircle,
} from 'lucide-react'
import type { ReviewSuggestion } from '@/lib/api'

interface Props {
  suggestion: ReviewSuggestion
}

export default function SuggestionCard({ suggestion }: Props) {
  const { line_number, severity, category, message, suggestion: advice } = suggestion

  const getSeverityIcon = () => {
    switch (severity) {
      case 'error':   return <XCircle className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'info':    return <Info className="w-4 h-4 text-blue-400" />
      default:        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  const getSeverityClass = () => {
    switch (severity) {
      case 'error':   return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'info':    return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      default:        return 'text-green-400 bg-green-500/10 border-green-500/20'
    }
  }

  const getCategoryIcon = () => {
    switch (category) {
      case 'bug':         return <AlertCircle className="w-4 h-4" />
      case 'performance': return <Zap className="w-4 h-4" />
      case 'security':    return <ShieldIcon className="w-4 h-4" />
      case 'style':       return <Code2 className="w-4 h-4" />
      default:            return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className={`p-4 rounded-xl border ${getSeverityClass()}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getSeverityIcon()}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">
              {category}
            </span>
            {line_number != null && (
              <span className="text-xs opacity-50">Line {line_number}</span>
            )}
          </div>
          <div className="text-sm">{message}</div>
          {advice && (
            <div className="text-xs opacity-70 mt-1">💡 {advice}</div>
          )}
        </div>
      </div>
    </div>
  )
}
