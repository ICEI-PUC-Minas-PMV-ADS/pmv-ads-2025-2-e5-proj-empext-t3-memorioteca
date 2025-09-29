export interface User {
  id: string
  email: string
  nome: string
  data_criacao: string
  ultimo_login: string | null
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export interface LoginData {
  email: string
  senha: string
}

export interface RegisterData {
  email: string
  nome: string
  senha: string
  confirmPassword: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  errors?: string[]
  user?: T
  token?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

export interface RegisterResponse {
  success: boolean
  errors: string[]
  user: User | null
}

export interface PageProps {
  className?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password'
  required?: boolean
  placeholder?: string
  validation?: (value: string) => string | undefined
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}