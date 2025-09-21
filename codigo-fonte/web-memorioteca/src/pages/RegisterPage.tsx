import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import { isValidEmail, isValidPassword } from '@/services/api'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    senha: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiErrors, setApiErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido'
    }

    if (!formData.nome) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
    } else if (formData.nome.length > 100) {
      newErrors.nome = 'Nome deve ter no máximo 100 caracteres'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (!isValidPassword(formData.senha)) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (formData.senha !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiErrors([])
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    const result = await register(formData.email, formData.nome, formData.senha)
    setIsLoading(false)
    
    if (result.success) {
      setSuccessMessage('Cadastro realizado com sucesso! Você pode fazer login agora.')
      setFormData({
        email: '',
        nome: '',
        senha: '',
        confirmPassword: ''
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setApiErrors(result.errors || [result.message || 'Erro no cadastro'])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    if (apiErrors.length > 0) {
      setApiErrors([])
    }
    
    if (successMessage) {
      setSuccessMessage('')
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
            <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
            <CardDescription>
              Junte-se à Memorioteca e comece a preservar suas memórias
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMessage && (
                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  {successMessage}
                </div>
              )}
              
              {apiErrors.length > 0 && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  <ul className="space-y-1">
                    {apiErrors.map((error, index) => (
                      <li key={`error-${index}-${error.substring(0, 10)}`}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Input
                label="Nome completo"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={errors.nome}
                placeholder="Seu nome completo"
                autoComplete="name"
              />
              
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
                autoComplete="new-password"
              />
              
              <Input
                label="Confirmar senha"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading || !!successMessage}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex-col space-y-2">
            <div className="text-sm text-muted-foreground text-center">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Faça login aqui
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage