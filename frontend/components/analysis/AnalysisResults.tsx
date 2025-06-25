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
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-400" />;
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
    <div className="space-y-6">
      {/* 总体评分 */}
      <div className="text-center">
        <div className="text-4xl font-bold mb-2">
          <span className={getScoreColor(results.overall_score)}>
            {results.overall_score.toFixed(1)}
          </span>
          <span className="text-gray-400 text-2xl">/10</span>
        </div>
        <p className="text-gray-300">{results.summary}</p>
      </div>

      {/* 建议列表 */}
      {results.suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-200 mb-3">Suggestions</h3>
          {results.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {getSeverityIcon(suggestion.severity)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getSeverityVariant(suggestion.severity)} size="sm">
                      {suggestion.severity}
                    </Badge>
                    <Badge variant="default" size="sm">
                      {suggestion.category}
                    </Badge>
                    {suggestion.line_number && (
                      <span className="text-xs text-gray-500">
                        Line {suggestion.line_number}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{suggestion.message}</p>
                  {suggestion.suggestion && (
                    <p className="text-gray-400 text-sm italic">
                      💡 {suggestion.suggestion}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 说明 */}
      {results.explanation && (
        <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800/50">
          <h4 className="text-blue-400 font-medium mb-2">Additional Notes</h4>
          <p className="text-gray-300 text-sm">{results.explanation}</p>
        </div>
      )}
    </div>
  );
}