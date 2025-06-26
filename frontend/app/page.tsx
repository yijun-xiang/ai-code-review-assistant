'use client';

import { useCallback, useEffect, useState } from 'react';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getExampleCode } from '../utils/constants';
import { Brain, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Home() {
  const [code, setCode] = useLocalStorage('ai-code-review-code', '');
  const [language, setLanguage] = useLocalStorage('ai-code-review-language', 'javascript');
  const { analyzeCode, results, status, error, reset } = useCodeAnalysis();
  const [isClient, setIsClient] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setIsClient(true);
    if (code && code.trim() !== '') {
      setShowPlaceholder(false);
    } else {
      setShowPlaceholder(true);
    }
  }, [code]);

  const handleAnalyze = useCallback(() => {
    if (!code.trim() || showPlaceholder) {
      return;
    }
    analyzeCode(code, language);
  }, [analyzeCode, code, language, showPlaceholder]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    reset();
  }, [setLanguage, reset]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    
    if (newCode === '') {
      setShowPlaceholder(true);
    } else {
      setShowPlaceholder(false);
    }
    
    if (status === 'completed' || status === 'error') {
      reset();
    }
  }, [setCode, status, reset]);

  const handleEditorFocus = useCallback(() => {
    if (showPlaceholder) {
      setCode('');
      setShowPlaceholder(false);
    }
  }, [showPlaceholder, setCode]);

  const displayCode = showPlaceholder ? getExampleCode(language) : code;

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-200">
              AI Code Review Assistant
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="hidden sm:block">
        <ParticleBackground />
      </div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute -top-40 -right-40 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-600 rounded-full blur-3xl opacity-10 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none hidden sm:block"></div>
      
      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="py-2 sm:py-3 md:py-4 border-b border-gray-900 relative px-2 sm:px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
          <div className="relative flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl blur-sm sm:blur-md opacity-20 group-hover:opacity-30 transition duration-300 hidden sm:block"></div>
              <div className="relative flex items-center space-x-1 sm:space-x-2 md:space-x-3 glass-dark px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl border border-purple-500/30 group-hover:border-purple-500/50 transition-all">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400 animate-pulse" />
                <h1 className="text-sm sm:text-lg md:text-2xl font-bold sm:font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 neon-text-subtle">
                    AI Code Review Assistant
                  </span>
                </h1>
              </div>
            </div>
            <span className="absolute right-1 sm:right-2 md:right-4 text-[10px] sm:text-xs text-gray-600 hidden sm:inline">Powered by OpenAI</span>
          </div>
          <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block">Transform your code with intelligent AI-powered insights</p>
        </div>
        
        <div className="flex-1 p-2 sm:p-3 md:p-4">
          <div className="h-full max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-140px)]">
              <div className="lg:col-span-3 flex flex-col min-h-[50vh] lg:min-h-0">
                <div className="flex-1 relative group mb-2 sm:mb-3">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-500 hidden sm:block"></div>
                  <div className="relative h-full glass-dark rounded-lg overflow-hidden border border-gray-800">
                    <CodeEditor
                      code={displayCode}
                      language={language}
                      onCodeChange={handleCodeChange}
                      onLanguageChange={handleLanguageChange}
                      isPlaceholder={showPlaceholder}
                      onEditorFocus={handleEditorFocus}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={status === 'analyzing' || !code.trim() || showPlaceholder}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-8 sm:h-9 md:h-10 text-xs sm:text-sm font-semibold shadow-lg"
                  size="sm"
                  loading={status === 'analyzing'}
                >
                  {status === 'analyzing' ? (
                    <span>Analyzing...</span>
                  ) : (
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Analyze with AI</span>
                      <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3" />
                    </div>
                  )}
                </Button>
              </div>
              
              <div className="lg:col-span-2 min-h-[40vh] lg:min-h-0 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-500 hidden sm:block"></div>
                <div className="relative h-full glass-dark rounded-lg overflow-hidden border border-gray-800 flex flex-col">
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