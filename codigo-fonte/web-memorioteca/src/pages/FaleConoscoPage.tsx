import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import { enviarMensagem } from '@/services/faleConoscoService'

interface FormData {
  nome: string
  email: string
  mensagem: string
}

export default function FaleConoscoPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    mensagem: ''
  })

  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
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
          <Input
            label="Mensagem"
            value={formData.mensagem}
            onChange={handleChange('mensagem')}
            required
          />

          {errors.length > 0 && (
            <ul className="text-red-500 text-sm">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          {success && (
            <p className="text-green-600 text-sm">Mensagem enviada com sucesso!</p>
          )}

          {/* ✅ Botão agora está dentro do form */}
          <CardFooter className="p-0">
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}