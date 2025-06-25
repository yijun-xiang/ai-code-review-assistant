'use client';

import { useCallback, useEffect, useState } from 'react';
import { Container } from '../components/layout/Container';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CODE, EXAMPLE_CODES } from '../utils/constants';
import { Shield, Zap, Brain, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Home() {
  const [code, setCode] = useLocalStorage('ai-code-review-code', DEFAULT_CODE);
  const [language, setLanguage] = useLocalStorage('ai-code-review-language', 'javascript');
  const { analyzeCode, results, status, error, reset } = useCodeAnalysis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = useCallback(() => {
    analyzeCode(code, language);
  }, [analyzeCode, code, language]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    reset();
    
    if (code === DEFAULT_CODE || Object.values(EXAMPLE_CODES).includes(code)) {
      const exampleCode = EXAMPLE_CODES[newLanguage];
      if (exampleCode) {
        setCode(exampleCode);
      }
    }
  }, [code, setCode, setLanguage, reset]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    if (status === 'completed' || status === 'error') {
      reset();
    }
  }, [setCode, status, reset]);

  return (
    <div className="flex flex-col h-screen overflow-hidden relative bg-gray-950">
      {/* Animated Background Effects */}
      <ParticleBackground />
      
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Container className="py-6">
          {/* Simplified Header */}
          <div className="text-center mb-8 relative">
            <h1 className="text-5xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
                AI Code Review Assistant
              </span>
            </h1>
            <p className="text-lg text-gray-400">Intelligent code analysis powered by advanced AI</p>
            
            {/* Status badges */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              <StatusBadge icon={<Shield className="h-4 w-4" />} text="Secure" color="green" />
              <StatusBadge icon={<Zap className="h-4 w-4" />} text="Lightning Fast" color="yellow" />
              <StatusBadge icon={<Brain className="h-4 w-4" />} text="AI Powered" color="purple" />
            </div>
          </div>
        </Container>
        
        {/* Main Content - New Layout */}
        <div className="flex-1 px-6 lg:px-8 pb-8 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
              {/* Left Side - Code Editor (3 columns) */}
              <div className="lg:col-span-3 flex flex-col space-y-4">
                {/* Code Editor */}
                <div className="flex-1 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative h-full">
                    <CodeEditor
                      code={code}
                      language={language}
                      onCodeChange={handleCodeChange}
                      onLanguageChange={handleLanguageChange}
                    />
                  </div>
                </div>
                
                {/* Analyze Button - Below Editor */}
                <Button
                  onClick={handleAnalyze}
                  disabled={status === 'analyzing' || !code.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  size="lg"
                  loading={status === 'analyzing'}
                >
                  {status === 'analyzing' ? (
                    <>Analyzing Your Code...</>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Analyze Code
                      <Sparkles className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Right Side - Analysis Results (2 columns) */}
              <div className="lg:col-span-2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative h-full">
                  <AnalysisPanel
                    onAnalyze={handleAnalyze}
                    status={status}
                    results={results}
                    error={error}
                    showAnalyzeButton={false} // 新增属性，隐藏面板内的按钮
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Animated CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Enhanced Status Badge Component
function StatusBadge({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };
  
  return (
    <span className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}>
      {icon}
      <span>{text}</span>
    </span>
  );
}