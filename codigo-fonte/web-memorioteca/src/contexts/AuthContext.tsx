import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { AuthState, User } from '@/types'
import { config } from '@/config/env'

interface AuthContextType extends AuthState {
  login: (email: string, senha: string) => Promise<{ success: boolean; message?: string }>
  register: (email: string, nome: string, senha: string) => Promise<{ success: boolean; message?: string; errors?: string[] }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('memorioteca_token')
    const savedUser = localStorage.getItem('memorioteca_user')
    
    if (savedToken && savedUser) {
      try {
        const user: User = JSON.parse(savedUser)
        setAuthState({
          user,
          token: savedToken,
          isAuthenticated: true,
          loading: false
        })
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error)
        localStorage.removeItem('memorioteca_token')
        localStorage.removeItem('memorioteca_user')
        setAuthState(prev => ({ ...prev, loading: false }))
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }))
    }
  }, [])

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (data.success && data.token && data.user) {
        localStorage.setItem('memorioteca_token', data.token)
        localStorage.setItem('memorioteca_user', JSON.stringify(data.user))
        
        setAuthState({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
          loading: false
        })

        return { success: true }
      } else {
        return { 
          success: false, 
          message: data.message || 'Erro no login' 
        }
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return { 
        success: false, 
        message: 'Erro de conexão com o servidor' 
      }
    }
  }

  const register = async (email: string, nome: string, senha: string) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nome, senha }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        return { success: true }
      } else { 
        return { 
          success: false, 
          message: 'Erro no cadastro',
          errors: data.errors || []
        }
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return { 
        success: false, 
        message: 'Erro de conexão com o servidor' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('memorioteca_token')
    localStorage.removeItem('memorioteca_user')
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false
    })
  }

  const value: AuthContextType = useMemo(() => ({
    ...authState,
    login,
    register,
    logout
  }), [authState])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}