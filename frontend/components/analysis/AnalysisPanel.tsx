import { Brain, Sparkles, Terminal, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureCard } from './FeatureCard';
import { AnalysisResults } from './AnalysisResults';
import { CodeReviewResponse, AnalysisStatus } from '../../types';

interface AnalysisPanelProps {
  onAnalyze: () => void;
  status: AnalysisStatus;
  results: CodeReviewResponse | null;
  error: string | null;
  showAnalyzeButton?: boolean;
}

export function AnalysisPanel({ onAnalyze, status, results, error }: AnalysisPanelProps) {
  const features = [
    {
      icon: <Shield className="h-5 w-5 text-green-400" />,
      title: 'Security Analysis',
      description: 'Detect vulnerabilities and security issues',
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: 'Performance Optimization',
      description: 'Find bottlenecks and improve speed',
    },
    {
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      title: 'Smart Suggestions',
      description: 'AI-powered code improvements',
    },
  ];

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-400 mb-2">Analysis Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button onClick={onAnalyze} variant="secondary" size="sm">
            Try Again
          </Button>
        </div>
      );
    }

    if (status === 'completed' && results) {
      return (
        <div className="p-6">
          <AnalysisResults results={results} />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Terminal className="h-16 w-16 text-gray-600 mb-6" />
        <h3 className="text-2xl font-bold text-gray-200 mb-2">Ready for Analysis</h3>
        <p className="text-gray-400 mb-8 max-w-sm">
          Add your code in the editor to get AI-powered insights
        </p>
        
        <div className="w-full max-w-md space-y-6 mb-8">
          <h4 className="text-lg font-medium text-gray-300 mb-4">What you&apos;ll get:</h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 max-w-md">
          <div className="flex items-start space-x-2">
            <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h5 className="text-sm font-medium text-gray-200 mb-1">Pro Tip</h5>
              <p className="text-xs text-gray-400">
                For best results, paste complete functions or code blocks
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showAnalyzeButton = status === 'idle' || (status === 'error' && !!error);
  const showAnalyzingButton = status === 'analyzing';
  const showAnalyzeAgainButton = status === 'completed' && !!results;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-medium text-gray-200">AI Analysis</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      
      {showAnalyzeButton && (
        <div className="p-6 border-t border-gray-700">
          <Button
            onClick={onAnalyze}
            className="w-full"
            size="lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Analyze Code
          </Button>
        </div>
      )}
      
      {showAnalyzingButton && (
        <div className="p-6 border-t border-gray-700">
          <Button className="w-full" size="lg" loading={true}>
            Analyzing...
          </Button>
        </div>
      )}
      
      {showAnalyzeAgainButton && (
        <div className="p-6 border-t border-gray-700">
          <Button
            onClick={onAnalyze}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Analyze Again
          </Button>
        </div>
      )}
    </Card>
  );
  
  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-400 mb-2">Analysis Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          {showAnalyzeButton && (
            <Button onClick={onAnalyze} variant="secondary" size="sm">
              Try Again
            </Button>
          )}
        </div>
      );
    }

    if (status === 'completed' && results) {
      return (
        <div className="p-6">
          <AnalysisResults results={results} />
        </div>
      );
    }

    // 待机状态的新设计
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse"></div>
          <Terminal className="h-20 w-20 text-gray-500 relative z-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-200 mb-2 mt-8">Ready for Analysis</h3>
        <p className="text-gray-400 mb-8 max-w-sm">
          Write or paste your code, then click analyze to get AI-powered insights
        </p>
        
        <div className="w-full max-w-md space-y-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} enhanced />
          ))}
        </div>
      </div>
    );
  };

  // 只在需要时显示底部按钮
  const shouldShowBottomButton = showAnalyzeButton && (
    (status === 'idle' && !error) || 
    (status === 'error' && !!error) || 
    (status === 'completed' && !!results)
  );

  return (
    <Card className="flex flex-col h-full bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          <h2 className="text-lg font-medium text-gray-200">AI Analysis</h2>
        </div>
        {status === 'analyzing' && (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-purple-400 rounded-full animate-ping"></div>
            <span className="text-sm text-purple-400">Processing...</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      
      {shouldShowBottomButton && (
        <div className="p-6 border-t border-gray-700">
          {/* 按钮逻辑保持不变，但不再需要显示 */}
        </div>
      )}
    </Card>
  );
}