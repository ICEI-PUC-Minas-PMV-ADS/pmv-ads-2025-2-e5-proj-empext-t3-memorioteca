import { AuthResponse, RegisterResponse, LoginData, RegisterData } from '@/types'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

export class ApiService {
  static async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Erro no servidor'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de login:', error)
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      }
    }
  }

  static async register(userData: Omit<RegisterData, 'confirmPassword'>): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          errors: errorData.errors || ['Erro no servidor'],
          user: null
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de cadastro:', error)
      return {
        success: false,
        errors: ['Erro de conexão com o servidor'],
        user: null
      }
    }
  }

  static async getUserProfile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Falha ao buscar perfil do usuário')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      throw error
    }
  }

  static async getProject(id:string, token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/project:${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Falha ao recuperar o projeto')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao recuperar projeto:', error)
      throw error
    }
  }
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}

export const getAuthHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
})