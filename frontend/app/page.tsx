'use client';

import { useCallback, useEffect, useState } from 'react';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CODE, EXAMPLE_CODES } from '../utils/constants';
import { Brain, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Home() {
  const [code, setCode] = useLocalStorage('ai-code-review-code', DEFAULT_CODE);
  const [language, setLanguage] = useLocalStorage('ai-code-review-language', 'javascript');
  const { analyzeCode, results, status, error, reset } = useCodeAnalysis();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return (
      <div className="flex flex-col h-screen overflow-hidden relative bg-black">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-200">
              AI Code Review Assistant
            </h1>
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-black flex flex-col">
      {/* Background Effects - Subtle */}
      <ParticleBackground />
      
      {/* Minimal Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-10 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Enhanced Centered Header */}
        <div className="py-4 border-b border-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
          <div className="relative flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative flex items-center space-x-3 glass-dark px-6 py-2 rounded-xl border border-purple-500/30 group-hover:border-purple-500/50 transition-all">
                <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
                <h1 className="text-2xl font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 neon-text-subtle">
                    AI Code Review Assistant
                  </span>
                </h1>
              </div>
            </div>
            <span className="absolute right-4 text-xs text-gray-600">Powered by OpenAI</span>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Transform your code with intelligent AI-powered insights</p>
        </div>
        
        {/* Editor and Analysis Section - Maximum Space */}
        <div className="flex-1 p-4">
          <div className="h-full max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
              {/* Code Editor */}
              <div className="lg:col-span-3 flex flex-col h-full">
                <div className="flex-1 relative group mb-3">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative h-full glass-dark rounded-lg overflow-hidden border border-gray-800">
                    <CodeEditor
                      code={code}
                      language={language}
                      onCodeChange={handleCodeChange}
                      onLanguageChange={handleLanguageChange}
                    />
                  </div>
                </div>
                
                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={status === 'analyzing' || !code.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 text-sm font-semibold shadow-lg"
                  size="md"
                  loading={status === 'analyzing'}
                >
                  {status === 'analyzing' ? (
                    <span>Analyzing...</span>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Analyze with AI</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  )}
                </Button>
              </div>
              
              {/* Analysis Panel */}
              <div className="lg:col-span-2 h-full relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full glass-dark rounded-lg overflow-hidden border border-gray-800">
                  <AnalysisPanel
                    onAnalyze={handleAnalyze}
                    status={status}
                    results={results}
                    error={error}
                    showAnalyzeButton={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}