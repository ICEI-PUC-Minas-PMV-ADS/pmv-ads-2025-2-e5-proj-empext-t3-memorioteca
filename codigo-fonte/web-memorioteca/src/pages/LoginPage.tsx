import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import { isValidEmail } from '@/services/api'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    const result = await login(formData.email, formData.senha)
    setIsLoading(false)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setApiError(result.message || 'Erro no login')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    if (apiError) {
      setApiError('')
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar a Memorioteca
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {apiError}
                </div>
              )}
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="seu@email.com"
                autoComplete="email"
              />
              
              <Input
                label="Senha"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                error={errors.senha}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex-col space-y-2">
            <div className="text-sm text-muted-foreground text-center">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se aqui
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage