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
  // 提交代码审查
  async reviewCode(request: CodeReviewRequest): Promise<CodeReviewResponse> {
    const response = await api.post<CodeReviewResponse>('/api/v1/review', request);
    return response.data;
  },

  // 获取支持的语言列表
  async getSupportedLanguages(): Promise<Language[]> {
    const response = await api.get<{ languages: Language[] }>('/api/v1/languages');
    return response.data.languages;
  },

  // 获取示例代码
  async getExampleCode(language: string): Promise<string> {
    const response = await api.get<{ examples: Record<string, string> }>('/api/v1/review/example');
    return response.data.examples[language] || '';
  },
};

// 错误处理
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 服务器返回错误
      const message = error.response.data?.detail || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // 请求发送失败
      throw new Error('Unable to connect to the server');
    } else {
      // 其他错误
      throw new Error('An unexpected error occurred');
    }
  }
);