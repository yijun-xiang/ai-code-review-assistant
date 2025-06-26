import axios from 'axios';
import { CodeReviewRequest, CodeReviewResponse, Language } from '@/types';
import { API_BASE_URL } from '@/utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const codeReviewService = {
  async reviewCode(request: CodeReviewRequest): Promise<CodeReviewResponse> {
    const response = await api.post<CodeReviewResponse>('/api/v1/review', request);
    return response.data;
  },

  async getSupportedLanguages(): Promise<Language[]> {
    const response = await api.get<{ languages: Language[] }>('/api/v1/languages');
    return response.data.languages;
  },

  async getExampleCode(language: string): Promise<string> {
    const response = await api.get<{ examples: Record<string, string> }>('/api/v1/review/example');
    return response.data.examples[language] || '';
  },
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.detail || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Unable to connect to the server');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
);