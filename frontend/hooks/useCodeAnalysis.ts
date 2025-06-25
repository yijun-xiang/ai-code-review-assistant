import { useState, useCallback } from 'react';
import { CodeReviewResponse, AnalysisStatus } from '@/types';
import { codeReviewService } from '@/services/api';

interface UseCodeAnalysisReturn {
  analyzeCode: (code: string, language: string) => Promise<void>;
  results: CodeReviewResponse | null;
  status: AnalysisStatus;
  error: string | null;
  reset: () => void;
}

export function useCodeAnalysis(): UseCodeAnalysisReturn {
  const [results, setResults] = useState<CodeReviewResponse | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = useCallback(async (code: string, language: string) => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setStatus('analyzing');
    setError(null);

    try {
      const response = await codeReviewService.reviewCode({
        code,
        language,
      });
      
      setResults(response);
      setStatus('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setStatus('idle');
    setError(null);
  }, []);

  return {
    analyzeCode,
    results,
    status,
    error,
    reset,
  };
}