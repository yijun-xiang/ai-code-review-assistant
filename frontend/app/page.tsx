'use client'

import { useState, useEffect } from 'react'
import { Code2, Zap, Shield, Cpu, Brain, ArrowRight, Terminal, Sparkles } from 'lucide-react'

export default function Home() {
  const [code, setCode] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      alert('🚀 Neural Analysis Complete!\n\n🔍 Security Scan: Passed\n⚡ Performance Score: 94/100\n🧠 AI Suggestions: 7 optimizations found\n🛡️ Vulnerability Check: Clean\n\n✨ Your code is ready for production!')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-300"
        style={{
          left: cursorPosition.x - 192,
          top: cursorPosition.y - 192,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-xl opacity-30 animate-pulse"></div>
              <div className="relative flex items-center justify-center gap-4 px-8 py-4 bg-gray-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-2xl">
                <Terminal className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="text-2xl font-mono text-cyan-400">NEURAL NETWORK</div>
                <Cpu className="w-8 h-8 text-blue-400 animate-spin-slow" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              AI CODE ANALYZER
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-lg text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SYSTEM ONLINE</span>
              </div>
              <div className="w-1 h-6 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>NEURAL ENGINE v2.0</span>
              </div>
            </div>
          </header>

          {/* Main Interface */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Input Panel */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-400/10 rounded-xl border border-cyan-400/20">
                      <Code2 className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">CODE INPUT</h2>
                      <p className="text-cyan-400 text-sm font-mono">NEURAL_ANALYSIS_MODE</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// INITIATE NEURAL SCAN
// Paste your code here for advanced AI analysis
// Supports: JavaScript, Python, Java, C++, React...

function example() {
  console.log('Ready for analysis...');
}"
                    className="w-full h-96 p-6 bg-black/60 border border-gray-700/50 rounded-xl text-green-400 font-mono text-sm resize-none focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-500 placeholder-gray-500 backdrop-blur-sm"
                    spellCheck={false}
                  />
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-800/80 rounded-lg border border-gray-600">
                    <span className="text-xs text-cyan-400 font-mono">
                      {code.length} CHARS • {code.split('\n').length} LINES
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>SECURE CONNECTION</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>REAL-TIME ANALYSIS</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={!code.trim() || isAnalyzing}
                    className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-3">
                      {isAnalyzing ? (
                        <>
                          <Brain className="w-5 h-5 animate-spin" />
                          ANALYZING...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          INITIATE SCAN
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-600 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-400/10 rounded-xl border border-purple-400/20">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">NEURAL ANALYSIS</h2>
                    <p className="text-purple-400 text-sm font-mono">AI_PROCESSING_UNIT</p>
                  </div>
                </div>

                {isAnalyzing ? (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="relative inline-block mb-4">
                        <Brain className="w-16 h-16 text-purple-400 animate-spin" />
                        <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">NEURAL SCAN IN PROGRESS</h3>
                      <p className="text-gray-400 mb-4">AI algorithms analyzing your code...</p>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-400 to-cyan-400 h-full rounded-full animate-progress"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        'Scanning for vulnerabilities...',
                        'Analyzing performance patterns...',
                        'Checking code quality metrics...',
                        'Running AI optimization engine...',
                        'Generating improvement suggestions...'
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="relative inline-block mb-6">
                      <div className="w-24 h-24 border-2 border-gray-700 rounded-full flex items-center justify-center relative">
                        <Terminal className="w-12 h-12 text-gray-500" />
                        <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-spin" style={{clipPath: 'inset(0 0 80% 0)'}}></div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">AWAITING NEURAL INPUT</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                      Upload your code to unlock advanced AI analysis including:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { icon: Shield, label: 'SECURITY SCAN', color: 'text-green-400' },
                        { icon: Zap, label: 'PERFORMANCE', color: 'text-yellow-400' },
                        { icon: Brain, label: 'AI SUGGESTIONS', color: 'text-purple-400' },
                        { icon: Cpu, label: 'OPTIMIZATION', color: 'text-blue-400' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <span className="text-gray-300 text-xs">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-8 flex justify-center">
            <div className="px-6 py-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>NEURAL NETWORK ACTIVE</span>
                </div>
                <div className="w-1 h-4 bg-gray-600"></div>
                <span>NEXT.JS • TAILWIND • AI POWERED</span>
                <div className="w-1 h-4 bg-gray-600"></div>
                <span>BUILT FOR DEVELOPERS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}