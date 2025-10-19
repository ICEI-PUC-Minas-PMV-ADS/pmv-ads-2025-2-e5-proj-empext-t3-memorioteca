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
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <Card>
            <CardHeader>
              <CardTitle>Fale Conosco</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome"
                  value={formData.nome}
                  onChange={handleChange('nome')}
                  required
                />
                <Input
                  label="E-mail"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
                <Textarea
                  label="Mensagem"
                  value={formData.mensagem}
                  onChange={handleChange('mensagem')}
                  required
                  rows={6}
                />

                {errors.length > 0 && (
                  <ul className="text-red-500 text-sm">
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}

                {success && (
                  <p className="text-green-600 text-sm">
                    Mensagem enviada com sucesso!
                  </p>
                )}

                <div className="flex gap-4 justify-center pt-4">
                  <Button type="submit">Enviar</Button>
                  {user?.user_type === 'ADMINISTRADOR' && (
                    <Button
                      type="button"
                      onClick={() => navigate('/mensagens')}
                    >
                      Mensagens
                    </Button>
                  )}
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