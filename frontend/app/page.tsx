'use client';

import { useCallback, useEffect, useState } from 'react';
import { Container } from '../components/layout/Container';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { ParticleBackground } from '../components/effects/ParticleBackground';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CODE, EXAMPLE_CODES } from '../utils/constants';
import { Shield, Zap, Brain } from 'lucide-react';

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
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Container className="py-8">
          {/* 简化的标题区域 */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2 relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                AI Code Review Assistant
              </span>
            </h1>
            <p className="text-lg text-gray-400 relative z-10">
              AI-powered code review and optimization
            </p>
            
            {/* 状态指示器 */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <StatusBadge icon={<Shield className="h-4 w-4" />} text="Secure" />
              <StatusBadge icon={<Zap className="h-4 w-4" />} text="Real-time" />
              <StatusBadge icon={<Brain className="h-4 w-4" />} text="Powered by Advanced AI" />
            </div>
          </div>
        </Container>
        
        {/* 主要内容区域 - 调整间距 */}
        <div className="flex-1 px-6 lg:px-8 pb-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-w-7xl mx-auto">
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
        
        {/* 简化的底部信息 */}
        <footer className="py-4 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Secure
            </span>
            <span>•</span>
            <span>Real-time Analysis</span>
            <span>•</span>
            <span>Powered by OpenAI</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

// 简化的状态徽章组件
function StatusBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center space-x-1 text-gray-400">
      {icon}
      <span>{text}</span>
    </span>
  );
}