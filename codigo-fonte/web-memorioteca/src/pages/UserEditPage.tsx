import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface UserData {
  id: string
  nome: string
  email: string
  user_type?: string
}

const UserEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user: currentUser, token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState<UserData>({
    id: '',
    nome: '',
    email: '',
    user_type: 'NORMAL'
  })

  useEffect(() => {
    if (currentUser?.user_type !== 'ADMINISTRADOR') {
      navigate('/dashboard')
      return
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (data.success && data.user) {
          setFormData({
            id: data.user.id,
            nome: data.user.nome,
            email: data.user.email,
            user_type: data.user.user_type || 'NORMAL'
          })
        } else {
          setErrors(['Erro ao carregar dados do usuário'])
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        setErrors(['Erro ao carregar dados do usuário'])
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, currentUser, token, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors([])
    setSuccessMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')
    setSaving(true)

    try {
      const updateData: any = {
        nome: formData.nome,
        email: formData.email
      }

      // Apenas permite alterar user_type se for um usuário diferente do atual
      if (formData.id !== currentUser?.id) {
        updateData.user_type = formData.user_type
      }

      const response = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccessMessage('Usuário atualizado com sucesso!')
        setTimeout(() => {
          navigate('/admin/usuarios')
        }, 1500)
      } else {
        setErrors(data.errors || ['Erro ao atualizar usuário'])
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      setErrors(['Erro ao atualizar usuário'])
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  const isEditingSelf = formData.id === currentUser?.id

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Editar Usuário
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Atualize os dados do usuário
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
                  label="Nome*"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Email*"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {/* Campo user_type apenas visível se não estiver editando a si mesmo */}
                {!isEditingSelf && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tipo de Usuário*
                    </label>
                    <select
                      name="user_type"
                      value={formData.user_type}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="NORMAL">NORMAL</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    </select>
                  </div>
                )}

                {isEditingSelf && (
                  <div className="p-3 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
                    Você não pode alterar seu próprio tipo de usuário.
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                  *Campos obrigatórios
                </p>

                <div className="flex gap-4 mt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={saving || !!successMessage}
                  >
                    {saving ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => navigate('/admin/usuarios')}
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

export default UserEditPage
