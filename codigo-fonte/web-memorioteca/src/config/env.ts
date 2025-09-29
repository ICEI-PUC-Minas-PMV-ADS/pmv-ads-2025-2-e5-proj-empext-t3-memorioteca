export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  NODE_ENV: import.meta.env.MODE || 'development',
} as const

export default config