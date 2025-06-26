export interface CodeReviewRequest {
    code: string;
    language: string;
    context?: string;
  }
  
  export interface ReviewSuggestion {
    line_number?: number;
    severity: 'error' | 'warning' | 'info';
    category: 'bug' | 'style' | 'performance' | 'security' | 'general';
    message: string;
    suggestion?: string;
  }
  
  export interface CodeReviewResponse {
    overall_score: number;
    summary: string;
    suggestions: ReviewSuggestion[];
    explanation?: string;
  }
  
  export interface Language {
    value: string;
    label: string;
  }
  
  export type AnalysisStatus = 'idle' | 'analyzing' | 'completed' | 'error';
  
  export interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }