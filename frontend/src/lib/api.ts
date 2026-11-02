import axios, { InternalAxiosRequestConfig } from 'axios'
import { mockService } from '@/services/mockService'

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Check if running on GitHub Pages or static host where backend is not present
const isStaticOrGitHubPages =
  typeof window !== 'undefined' &&
  (window.location.hostname.includes('github.io') ||
    window.location.protocol === 'file:' ||
    window.location.port === '4173' ||
    Boolean((import.meta as unknown as { env?: { VITE_USE_MOCK?: string } }).env?.VITE_USE_MOCK === 'true'))

function handleMockRequest(url: string, _method: string, data?: any, params?: any) {
  // Normalize url
  const cleanUrl = url.replace(/^\/?api\/v1\/?/, '').replace(/^\//, '')

  // 1. Directory list: /directory
  if (cleanUrl === 'directory' || cleanUrl.startsWith('directory?')) {
    const list = mockService.getDirectory(params)
    return { data: list, status: 200, statusText: 'OK' }
  }

  // 2. Directory claim: /directory/:id/claim
  const claimMatch = cleanUrl.match(/^directory\/([^/]+)\/claim/)
  if (claimMatch) {
    const id = claimMatch[1]
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data
    const res = mockService.claimRecord(id, parsedData)
    return { data: res, status: 200, statusText: 'OK' }
  }

  // 3. Profiles: /profiles/:id
  const profileMatch = cleanUrl.match(/^profiles\/([^/]+)/)
  if (profileMatch) {
    const profileId = profileMatch[1]
    const profile = mockService.getProfile(profileId)
    return { data: profile, status: 200, statusText: 'OK' }
  }

  // 4. AI Ask Network: /ai/ask-network
  if (cleanUrl.startsWith('ai/ask-network')) {
    const parsedData = typeof data === 'string' ? JSON.parse(data || '{}') : (data || {})
    const res = mockService.askNetwork(parsedData.query || '', parsedData.include_unclaimed)
    return { data: res, status: 200, statusText: 'OK' }
  }

  // 5. AI Extract Profile: /ai/extract-profile
  if (cleanUrl.startsWith('ai/extract-profile')) {
    const parsedData = typeof data === 'string' ? JSON.parse(data || '{}') : (data || {})
    const res = mockService.extractProfile(parsedData.raw_text || '')
    return { data: res, status: 200, statusText: 'OK' }
  }

  return { data: { message: 'OK' }, status: 200, statusText: 'OK' }
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // When running on GitHub Pages, use adapter to serve directly without failing HTTP requests
  if (isStaticOrGitHubPages) {
    config.adapter = async (cfg) => {
      // Small simulated latency for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 150))
      const mockRes = handleMockRequest(cfg.url || '', cfg.method || 'GET', cfg.data, cfg.params)
      return {
        data: mockRes.data,
        status: mockRes.status,
        statusText: mockRes.statusText,
        headers: {},
        config: cfg,
        request: {},
      }
    }
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    // Seamless fallback to mock data if backend request fails (404, 500, or network offline)
    if (
      error.config &&
      (!error.response || error.response.status === 404 || error.response.status >= 500 || error.code === 'ERR_NETWORK')
    ) {
      console.warn('Backend unavailable, falling back to local domain mock data:', error.config.url)
      const mockRes = handleMockRequest(
        error.config.url || '',
        error.config.method || 'GET',
        error.config.data,
        error.config.params
      )
      return {
        data: mockRes.data,
        status: 200,
        statusText: 'OK (Mock Fallback)',
        headers: {},
        config: error.config,
      }
    }

    return Promise.reject(error)
  }
)
