'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import CodeEditor from '@/components/CodeEditor'
import AnalysisPanel from '@/components/AnalysisPanel'
import { codeReviewAPI, ReviewSuggestion, Language as API_Language } from '@/lib/api'

export default function Page() {
  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<string>('javascript')
  const [languages, setLanguages] = useState<API_Language[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<ReviewSuggestion[] | null>(null)
  const [overallScore, setOverallScore] = useState<number | null>(null)
  const [summary, setSummary] = useState<string | null>(null)

  useEffect(() => {
    codeReviewAPI.getLanguages()
      .then(setLanguages)
      .catch(() => console.error('Failed to load languages'))

    setCode(`// Welcome to AI Code Analyzer
// Paste your code here for intelligent analysis

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  process() {
    return this.data.map(item => item * 2);
  }
}

// Try pasting your own code here...`)
  }, [])

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze')
      return
    }
    setIsAnalyzing(true)
    setError(null)
    try {
      const { overall_score, summary: sum, suggestions: list } =
        await codeReviewAPI.submitReview({ code, language })
      setOverallScore(overall_score)
      setSummary(sum)
      setSuggestions(list)
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      setError(msg)
      console.error(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          languages={languages}
          isAnalyzing={isAnalyzing}
          handleAnalyze={handleAnalyze}
        />
        <AnalysisPanel
          isAnalyzing={isAnalyzing}
          error={error}
          overallScore={overallScore}
          summary={summary}
          suggestions={suggestions}
        />
      </div>
    </div>
  )
}
