import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors([])
    setSuccessMessage('')
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.senhaAtual) {
      newErrors.push('Senha atual é obrigatória')
    }

    if (!formData.novaSenha) {
      newErrors.push('Nova senha é obrigatória')
    } else if (formData.novaSenha.length < 6) {
      newErrors.push('Nova senha deve ter pelo menos 6 caracteres')
    }

    if (!formData.confirmarSenha) {
      newErrors.push('Confirmação de senha é obrigatória')
    }

    if (formData.novaSenha && formData.confirmarSenha && formData.novaSenha !== formData.confirmarSenha) {
      newErrors.push('Nova senha e confirmação não coincidem')
    }

    if (formData.senhaAtual && formData.novaSenha && formData.senhaAtual === formData.novaSenha) {
      newErrors.push('Nova senha deve ser diferente da senha atual')
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/${user?.id}/senha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senhaAtual: formData.senhaAtual,
          novaSenha: formData.novaSenha
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccessMessage('Senha alterada com sucesso!')
        setFormData({
          senhaAtual: '',
          novaSenha: '',
          confirmarSenha: ''
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        setErrors(data.errors || ['Erro ao alterar senha'])
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      setErrors(['Erro ao alterar senha'])
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Alterar Senha
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Digite sua senha atual e escolha uma nova senha
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {successMessage && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {successMessage}
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    <ul className="space-y-1">
                      {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Input
                  label="Senha Atual*"
                  name="senhaAtual"
                  type="password"
                  value={formData.senhaAtual}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />

                <Input
                  label="Nova Senha*"
                  name="novaSenha"
                  type="password"
                  value={formData.novaSenha}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />

                <Input
                  label="Confirmar Nova Senha*"
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />

                <p className="text-xs text-muted-foreground">
                  *Campos obrigatórios
                </p>

                <p className="text-xs text-muted-foreground">
                  A senha deve ter no mínimo 6 caracteres
                </p>

                <div className="flex gap-4 mt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={saving || !!successMessage}
                  >
                    {saving ? 'Alterando...' : 'Alterar Senha'}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => navigate('/dashboard')}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ChangePasswordPage
