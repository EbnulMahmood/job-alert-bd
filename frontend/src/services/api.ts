import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types
export interface Job {
  id: number
  company: string
  title: string
  url: string
  description?: string
  requirements?: string
  location: string
  job_type: string
  experience_level?: string
  posted_date?: string
  deadline?: string
  salary_range?: string
  tags: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface JobListResponse {
  jobs: Job[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface Company {
  company: string
  count: number
}

export interface JobStats {
  total_jobs: number
  by_company: Record<string, number>
  by_experience_level: Record<string, number>
}

export interface Subscription {
  id: number
  email?: string
  push_endpoint?: string
  companies: string[]
  keywords: string[]
  is_active: boolean
  created_at: string
}

// API Functions
export const jobsApi = {
  getJobs: async (params: {
    page?: number
    per_page?: number
    company?: string
    search?: string
    experience_level?: string
    job_type?: string
  }): Promise<JobListResponse> => {
    const { data } = await api.get('/jobs/', { params })
    return data
  },

  getJob: async (id: number): Promise<Job> => {
    const { data } = await api.get(`/jobs/${id}`)
    return data
  },

  getCompanies: async (): Promise<Company[]> => {
    const { data } = await api.get('/jobs/companies')
    return data
  },

  getStats: async (): Promise<JobStats> => {
    const { data } = await api.get('/jobs/stats')
    return data
  },

  getMonitoredCompanies: async () => {
    const { data } = await api.get('/companies/monitored')
    return data
  },
}

export const subscriptionApi = {
  create: async (subscription: {
    email?: string
    push_endpoint?: string
    push_keys?: { p256dh: string; auth: string }
    companies?: string[]
    keywords?: string[]
  }): Promise<Subscription> => {
    const { data } = await api.post('/subscriptions/', subscription)
    return data
  },

  update: async (id: number, subscription: Partial<Subscription>): Promise<Subscription> => {
    const { data } = await api.put(`/subscriptions/${id}`, subscription)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/subscriptions/${id}`)
  },

  lookupByEndpoint: async (pushEndpoint: string): Promise<Subscription | null> => {
    try {
      const { data } = await api.post('/subscriptions/lookup-by-endpoint', {
        push_endpoint: pushEndpoint,
      })
      return data
    } catch {
      return null
    }
  },

  unsubscribeByEmail: async (email: string): Promise<void> => {
    await api.post('/subscriptions/unsubscribe-by-email', null, { params: { email } })
  },
}

export const notificationApi = {
  getVapidPublicKey: async (): Promise<string> => {
    const { data } = await api.get('/notifications/vapid-public-key')
    return data.publicKey
  },

  testPush: async (subscriptionId: number): Promise<{ success: boolean; message: string }> => {
    const { data } = await api.post(`/notifications/test-push/${subscriptionId}`)
    return data
  },
}

export default api
