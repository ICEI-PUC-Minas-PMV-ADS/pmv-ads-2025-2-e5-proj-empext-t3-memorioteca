import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import Textarea from '@/components/ui/Textarea'
import { enviarMensagem } from '@/services/faleConoscoService'
import { useAuth } from '@/contexts/AuthContext'

interface FormData {
  nome: string
  email: string
  mensagem: string
}

export default function FaleConoscoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    mensagem: ''
  })

  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, errors } = await enviarMensagem(formData)

    if (!success) {
      setErrors(errors || [])
      return
    }

    setSuccess(true)
    setFormData({ nome: '', email: '', mensagem: '' })
    setErrors([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4 pb-4">
              <div className="inline-block">
                <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Fale Conosco
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Envie sua mensagem, dúvida ou sugestão. Estamos aqui para ajudar!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
                <span>Contato</span>
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
              </div>
            </div>

            <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white hover:shadow-primary/20 transition-all duration-300">
              <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  Envie sua Mensagem
                </CardTitle>
                <p className="text-gray-100 mt-2 relative z-10">Preencha o formulário abaixo</p>
              </CardHeader>

              <CardContent className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nome"
                      value={formData.nome}
                      onChange={handleChange('nome')}
                      required
                      placeholder="Seu nome completo"
                    />
                    <Input
                      label="E-mail"
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <Textarea
                    label="Mensagem"
                    value={formData.mensagem}
                    onChange={handleChange('mensagem')}
                    required
                    rows={8}
                    placeholder="Digite sua mensagem aqui..."
                  />

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

                  {success && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-1">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <p className="text-green-800 font-semibold">
                          Mensagem enviada com sucesso!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <Button 
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                    >
                      <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar Mensagem
                    </Button>
                    {user?.user_type === 'ADMINISTRADOR' && (
                      <Button
                        type="button"
                        onClick={() => navigate('/mensagens')}
                        variant="outline"
                        className="flex-1 border-2 hover:bg-gray-50 font-semibold group"
                      >
                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        Ver Mensagens Recebidas
                      </Button>
                    )}
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