import axios, { AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, 
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export interface CodeReviewRequest {
  code: string
  language: string
  context?: string
}

export interface ReviewSuggestion {
  line_number?: number
  severity: 'error' | 'warning' | 'info'
  category: string
  message: string
  suggestion?: string
}

export interface CodeReviewResponse {
  overall_score: number
  summary: string
  suggestions: ReviewSuggestion[]
  explanation?: string
}

export interface Language {
  value: string
  label: string
}

export interface HealthCheckResponse {
  status: string
  service: string
  version: string
}

interface ErrorResponse {
  detail?: string
  message?: string
}

export const codeReviewAPI = {
  submitReview: async (data: CodeReviewRequest): Promise<CodeReviewResponse> => {
    const response = await api.post<CodeReviewResponse>('/api/v1/review', data)
    return response.data
  },
  
  getLanguages: async (): Promise<Language[]> => {
    const response = await api.get<{ languages: Language[] }>('/api/v1/languages')
    return response.data.languages
  },
  
  healthCheck: async (): Promise<HealthCheckResponse> => {
    const response = await api.get<HealthCheckResponse>('/health')
    return response.data
  },
  
  getExampleCode: async (language: string): Promise<string> => {
    const response = await api.get<{ examples: Record<string, string> }>('/api/v1/review/example')
    return response.data.examples[language] || ''
  },
}

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await codeReviewAPI.healthCheck()
    return true
  } catch (error) {
    console.error('Backend connection failed:', error)
    return false
  }
}

export const formatErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>
    if (axiosError.response?.data?.detail) {
      return axiosError.response.data.detail
    }
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
    if (axiosError.message) {
      return axiosError.message
    }
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}