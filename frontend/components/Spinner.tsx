import React from 'react'
import { Brain } from 'lucide-react'

export default function Spinner() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <Brain className="absolute inset-0 w-8 h-8 m-auto text-purple-400" />
      </div>
      <p className="text-lg font-semibold text-white">Analyzing Code</p>
      <p className="text-sm text-gray-400 mt-1">AI is processing your code...</p>
    </div>
  )
}
