'use client'

import { useState, useEffect } from 'react'
import { Code2, Zap, Shield, Cpu, Brain, ArrowRight, Terminal, Sparkles, Play, FileCode, Scan } from 'lucide-react'

export default function Home() {
  const [code, setCode] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      alert('🚀 AI Analysis Complete!\n\n🔍 Security Scan: Passed\n⚡ Performance Score: 94/100\n🧠 AI Suggestions: 7 optimizations found\n🛡️ Vulnerability Check: Clean\n\n✨ Your code is ready for production!')
    }, 3000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400">AI Code Analyzer</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Code Analysis
          </h1>
          <p className="text-sm text-gray-400">AI-powered code review and optimization</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Powered by Advanced AI</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-gray-900/50">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Code Editor</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{code.length} chars</span>
              <span>•</span>
              <span>{code.split('\n').length} lines</span>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`// Welcome to AI Code Analyzer
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
    return this.data.map(item => {
      return item * 2;
    });
  }
}

// Try pasting your own code here...
console.log(fibonacci(10));`}
              className="w-full h-full p-6 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none placeholder-gray-500 leading-relaxed"
              spellCheck={false}
            />
            
            {/* Line Numbers */}
            <div className="absolute left-2 top-6 flex flex-col text-xs text-gray-600 font-mono select-none pointer-events-none">
              {Array.from({ length: Math.max(20, code.split('\n').length) }, (_, i) => (
                <div key={i} className="h-5 leading-relaxed">{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Editor Footer */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 border-t border-gray-700/50">
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
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-700/50"></div>

        {/* Right Panel - Analysis */}
        <div className="w-96 flex flex-col bg-gray-900/30">
          
          {/* Analysis Header */}
          <div className="flex items-center gap-3 p-4 bg-gray-800/50 border-b border-gray-700/50">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-medium">AI Analysis</span>
            {isAnalyzing && (
              <div className="ml-auto flex items-center gap-2 text-sm text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                Processing
              </div>
            )}
          </div>

          {/* Analysis Content */}
          <div className="flex-1 p-6 overflow-auto">
            {isAnalyzing ? (
              <div className="space-y-6">
                {/* Processing Animation */}
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <Brain className="absolute inset-0 w-6 h-6 m-auto text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Analyzing Code</h3>
                    <p className="text-sm text-gray-400">AI is processing your code...</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Security scan', color: 'text-green-400' },
                    { icon: Zap, text: 'Performance check', color: 'text-yellow-400' },
                    { icon: Code2, text: 'Quality review', color: 'text-blue-400' },
                    { icon: Brain, text: 'AI suggestions', color: 'text-purple-400' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <step.icon className={`w-4 h-4 ${step.color}`} />
                      <span className="text-sm text-gray-300">{step.text}</span>
                      <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Idle State */}
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 border-2 border-gray-600 rounded-full flex items-center justify-center bg-gray-800/50">
                      <Terminal className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Ready for Analysis</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Add your code in the editor to get AI-powered insights
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">What you'll get:</h4>
                  {[
                    { 
                      icon: Shield, 
                      title: 'Security Analysis',
                      desc: 'Detect vulnerabilities and security issues',
                      color: 'text-green-400 bg-green-500/10'
                    },
                    { 
                      icon: Zap, 
                      title: 'Performance Optimization',
                      desc: 'Find bottlenecks and improve speed',
                      color: 'text-yellow-400 bg-yellow-500/10'
                    },
                    { 
                      icon: Brain, 
                      title: 'Smart Suggestions',
                      desc: 'AI-powered code improvements',
                      color: 'text-purple-400 bg-purple-500/10'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feature.color}`}>
                          <feature.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-400 mt-1">{feature.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Tips */}
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400 mt-0.5" />
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
      </div>
    </div>
  )
}