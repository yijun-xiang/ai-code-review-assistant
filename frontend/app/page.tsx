'use client';

import { useCallback } from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { CodeEditor } from '../components/editor/CodeEditor';
import { AnalysisPanel } from '../components/analysis/AnalysisPanel';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CODE, EXAMPLE_CODES } from '../utils/constants';

export default function Home() {
  const [code, setCode] = useLocalStorage('ai-code-analyzer-code', DEFAULT_CODE);
  const [language, setLanguage] = useLocalStorage('ai-code-analyzer-language', 'javascript');
  const { analyzeCode, results, status, error, reset } = useCodeAnalysis();

  const handleAnalyze = useCallback(() => {
    analyzeCode(code, language);
  }, [analyzeCode, code, language]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    reset();
    
    // 如果当前代码是默认代码，切换到新语言的示例代码
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
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Container className="py-6">
          {/* 页面标题 */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">
              Smart Code Analysis
            </h1>
            <p className="text-lg text-gray-400">
              AI-powered code review and optimization
            </p>
          </div>
        </Container>
        
        {/* 主要内容区域 - 使用 flex-1 占满剩余空间 */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* 代码编辑器 */}
            <div className="min-h-0">
              <CodeEditor
                code={code}
                language={language}
                onCodeChange={handleCodeChange}
                onLanguageChange={handleLanguageChange}
              />
            </div>
            
            {/* 分析面板 */}
            <div className="min-h-0">
              <AnalysisPanel
                onAnalyze={handleAnalyze}
                status={status}
                results={results}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* 底部信息栏 */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <Container className="py-3">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Secure</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Real-time</span>
              </span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}