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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4 pb-4">
              <div className="inline-block">
                <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Alterar Senha
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Digite sua senha atual e escolha uma nova senha
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
                <span>Segurança</span>
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
              </div>
            </div>

            <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Redefinição de Senha
                </CardTitle>
                <p className="text-gray-100 mt-2 relative z-10">Mantenha sua conta segura</p>
              </CardHeader>

              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {successMessage && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-1">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <p className="text-green-800 font-semibold">
                          {successMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {errors.length > 0 && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
                      <div className="flex items-start gap-3">
                        <div className="bg-red-500 rounded-full p-1 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <ul className="text-red-700 text-sm space-y-1 flex-1">
                          {errors.map((err) => (
                            <li key={err} className="font-medium">• {err}</li>
                          ))}
                        </ul>
                      </div>
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

                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Requisitos de senha:</p>
                        <ul className="space-y-1">
                          <li>• Mínimo de 6 caracteres</li>
                          <li>• Diferente da senha atual</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                      disabled={saving || !!successMessage}
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Alterando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Alterar Senha
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-2 hover:bg-gray-50 font-semibold group"
                      onClick={() => navigate('/dashboard')}
                      disabled={saving}
                    >
                      <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ChangePasswordPage
