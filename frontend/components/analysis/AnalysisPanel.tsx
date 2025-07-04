import { Brain, Sparkles, Terminal, Shield, Zap, AlertTriangle, Code2, Layers, GitBranch } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnalysisResults } from './AnalysisResults';
import { CodeReviewResponse, AnalysisStatus } from '../../types';

interface AnalysisPanelProps {
  onAnalyze: () => void;
  status: AnalysisStatus;
  results: CodeReviewResponse | null;
  error: string | null;
  showAnalyzeButton?: boolean;
}

export function AnalysisPanel({ onAnalyze, status, results, error, showAnalyzeButton = true }: AnalysisPanelProps) {
  const features = [
    {
      icon: <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />,
      title: 'Security Analysis',
      description: 'Detect vulnerabilities',
      color: 'green' as const,
    },
    {
      icon: <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />,
      title: 'Performance',
      description: 'Optimize speed',
      color: 'yellow' as const,
    },
    {
      icon: <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />,
      title: 'AI Suggestions',
      description: 'Smart improvements',
      color: 'purple' as const,
    },
  ];

  const renderContent = () => {
    if (error) {
      return (
        <div className="h-full overflow-y-auto -webkit-overflow-scrolling-touch flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl sm:blur-2xl animate-pulse"></div>
            <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-400 relative z-10" />
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-red-400 mb-1 sm:mb-2 mt-3 sm:mt-4">Analysis Error</h3>
          <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm max-w-sm">{error}</p>
          <Button onClick={onAnalyze} variant="secondary" size="sm">
            Try Again
          </Button>
        </div>
      );
    }

    if (status === 'analyzing') {
      return (
        <div className="h-full overflow-y-auto -webkit-overflow-scrolling-touch flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6">
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-purple-500/30 blur-xl sm:blur-2xl animate-pulse-glow"></div>
            <div className="relative">
              <Brain className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-purple-400 animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-200 mb-1 sm:mb-2">Analyzing Your Code</h3>
          <p className="text-gray-400 mb-2 sm:mb-3 text-xs sm:text-sm">Our AI is reviewing your code...</p>
          <div className="loading-dots">
            <span className="bg-purple-400"></span>
            <span className="bg-pink-400"></span>
            <span className="bg-blue-400"></span>
          </div>
          
          <div className="mt-4 sm:mt-6 space-y-1 sm:space-y-2 w-full max-w-xs">
            <ProgressItem label="Syntax Analysis" progress={100} />
            <ProgressItem label="Security Scan" progress={75} />
            <ProgressItem label="Performance" progress={50} />
            <ProgressItem label="Best Practices" progress={25} />
          </div>
        </div>
      );
    }

    if (status === 'completed' && results) {
      return (
        <div className="h-full overflow-y-auto -webkit-overflow-scrolling-touch custom-scrollbar p-3 sm:p-4">
          <AnalysisResults results={results} />
        </div>
      );
    }

    return (
      <div className="h-full overflow-y-auto -webkit-overflow-scrolling-touch flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-6">
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl sm:blur-2xl animate-pulse"></div>
          <div className="relative glass-subtle p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl">
            <Terminal className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-gray-400 relative z-10" />
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-1 sm:mb-2">Ready for Analysis</h3>
        <p className="text-gray-400 mb-4 sm:mb-6 max-w-sm text-xs sm:text-sm">
          Write or paste your code, then click analyze to get AI-powered insights
        </p>
        
        <div className="w-full max-w-sm space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${
                feature.color === 'green' ? 'from-green-500/20 to-emerald-500/20' :
                feature.color === 'yellow' ? 'from-yellow-500/20 to-amber-500/20' :
                'from-purple-500/20 to-indigo-500/20'
              }`}>
                {feature.icon}
              </div>
              <div className="text-left">
                <h4 className="text-gray-200 font-medium text-xs sm:text-sm">{feature.title}</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs">
          <StatCard icon={<Code2 className="h-3 w-3 sm:h-4 sm:w-4" />} value="10+" label="Languages" />
          <StatCard icon={<Layers className="h-3 w-3 sm:h-4 sm:w-4" />} value="50+" label="Checks" />
          <StatCard icon={<GitBranch className="h-3 w-3 sm:h-4 sm:w-4" />} value="200+" label="Rules" />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800 bg-gradient-to-r from-gray-900/50 to-gray-800/50 flex-shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="relative">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 animate-pulse" />
            <div className="absolute inset-0 bg-purple-400/50 blur-lg sm:blur-xl"></div>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-gray-200">AI Analysis</h2>
        </div>
        {status === 'analyzing' && (
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-purple-400 rounded-full animate-ping"></div>
            <span className="text-[10px] sm:text-xs text-purple-400 font-medium">Processing...</span>
          </div>
        )}
        {status === 'completed' && results && (
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-400" />
            <span className="text-[10px] sm:text-xs text-green-400 font-medium">Complete</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
      
      {showAnalyzeButton && status === 'completed' && results && (
        <div className="p-3 sm:p-4 border-t border-gray-800 bg-gradient-to-r from-gray-900/50 to-gray-800/50 flex-shrink-0">
          <Button
            onClick={onAnalyze}
            variant="secondary"
            className="w-full hover:bg-purple-500/10 hover:border-purple-500/50"
            size="sm"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Analyze Again
          </Button>
        </div>
      )}
    </div>
  );
}

function ProgressItem({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] sm:text-xs mb-0.5 sm:mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-500">{progress}%</span>
      </div>
      <div className="h-1 sm:h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-subtle p-2 sm:p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300">
      <div className="flex flex-col items-center space-y-0.5 sm:space-y-1">
        <div className="text-gray-500">{icon}</div>
        <div className="text-xs sm:text-sm md:text-lg font-bold text-gray-200">{value}</div>
        <div className="text-[8px] sm:text-[10px] text-gray-500">{label}</div>
      </div>
    </div>
  );
}