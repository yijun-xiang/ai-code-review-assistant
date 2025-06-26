import { CodeReviewResponse } from '../../types';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface AnalysisResultsProps {
  results: CodeReviewResponse;
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />;
      case 'info':
        return <Info className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />;
      default:
        return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />;
    }
  };

  const getSeverityVariant = (severity: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
          <span className={getScoreColor(results.overall_score)}>
            {results.overall_score.toFixed(1)}
          </span>
          <span className="text-gray-400 text-xl sm:text-2xl">/10</span>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm">{results.summary}</p>
      </div>

      {results.suggestions.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-medium text-gray-200 mb-2 sm:mb-3">Suggestions</h3>
          {results.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                {getSeverityIcon(suggestion.severity)}
                <div className="flex-1 space-y-1.5 sm:space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <Badge variant={getSeverityVariant(suggestion.severity)} size="sm">
                      {suggestion.severity}
                    </Badge>
                    <Badge variant="default" size="sm">
                      {suggestion.category}
                    </Badge>
                    {suggestion.line_number && (
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        Line {suggestion.line_number}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm">{suggestion.message}</p>
                  {suggestion.suggestion && (
                    <p className="text-gray-400 text-xs sm:text-sm italic">
                      💡 {suggestion.suggestion}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.explanation && (
        <div className="p-3 sm:p-4 rounded-lg bg-blue-900/20 border border-blue-800/50">
          <h4 className="text-blue-400 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Additional Notes</h4>
          <p className="text-gray-300 text-xs sm:text-sm">{results.explanation}</p>
        </div>
      )}
    </div>
  );
}