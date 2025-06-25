'use client';

import { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CODE, EXAMPLE_CODES } from '../utils/constants';

export default function Home() {
  const [code, setCode] = useLocalStorage('ai-code-reviewer-code', DEFAULT_CODE);
  const [language, setLanguage] = useLocalStorage('ai-code-reviewer-language', 'javascript');
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
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Container className="py-6">
          {/* 页面标题 */}
          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            {/* Typewriter effect for title */}
            <h1 className="text-5xl font-bold mb-3 relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-gradient-x">
                {mounted && <TypewriterText text="AI CODE REVIEWER" />}
              </span>
            </h1>
            <p className="text-xl text-gray-300 relative z-10 opacity-90">
              Professional code analysis powered by OpenAI
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              <StatusIndicator color="green" text="Real-time Analysis" />
              <StatusIndicator color="blue" text="Best Practices" />
              <StatusIndicator color="purple" text="Bug Detection" />
            </div>
          </div>
        </Container>
        
        {/* 主要内容区域 */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* 代码编辑器 */}
            <div className="min-h-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative h-full">
                <CodeEditor
                  code={code}
                  language={language}
                  onCodeChange={handleCodeChange}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </div>
            
            {/* 分析面板 */}
            <div className="min-h-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative h-full">
                <AnalysisPanel
                  onAnalyze={handleAnalyze}
                  status={status}
                  results={results}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 底部信息栏 */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5"></div>
        <Container className="py-3 relative">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <StatusIndicator color="green" text="OpenAI Connected" pulse />
              <StatusIndicator color="blue" text="Real-time Analysis" pulse />
              <StatusIndicator color="purple" text="AI Ready" pulse />
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-gray-500">v2.0.0</span>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">GitHub</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// Status Indicator Component
function StatusIndicator({ color, text, pulse = false }: { color: string; text: string; pulse?: boolean }) {
  const colorClasses = {
    green: 'bg-green-400 shadow-green-400/50',
    blue: 'bg-blue-400 shadow-blue-400/50',
    purple: 'bg-purple-400 shadow-purple-400/50',
  };

  return (
    <span className="flex items-center space-x-2 text-gray-400">
      <span className={`relative flex h-2 w-2`}>
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClasses[color as keyof typeof colorClasses]} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClasses[color as keyof typeof colorClasses]} shadow-lg`}></span>
      </span>
      <span>{text}</span>
    </span>
  );
}

// Typewriter Effect Component
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <>{displayText}<span className="animate-blink">|</span></>;
}