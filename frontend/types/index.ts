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
  
  // 语言选项
  export interface Language {
    value: string;
    label: string;
  }
  
  // 分析状态
  export type AnalysisStatus = 'idle' | 'analyzing' | 'completed' | 'error';
  
  // 功能特性
  export interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }