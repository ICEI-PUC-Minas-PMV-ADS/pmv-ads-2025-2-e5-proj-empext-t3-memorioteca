import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface UserData {
  id: string
  nome: string
  email: string
  user_type?: string
  data_criacao: string
  ultimo_login?: string
}

const UsersPage = () => {
  const navigate = useNavigate()
  const { user: currentUser, token } = useAuth()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null)

  useEffect(() => {
    if (currentUser?.user_type !== 'ADMINISTRADOR') {
      navigate('/dashboard')
      return
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (data.success && data.users) {
          setUsers(data.users)
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentUser, token, navigate])

  const handleEdit = (id: string) => {
    navigate(`/admin/usuarios/${id}/edit`)
  }

  const handleDeleteClick = (user: UserData) => {
    if (user.id === currentUser?.id) {
      alert('Você não pode excluir sua própria conta por aqui.')
      return
    }
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    try {
      const response = await fetch(`/api/user/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setUsers(users.filter(u => u.id !== userToDelete.id))
        setShowDeleteModal(false)
        setUserToDelete(null)
      } else {
        alert('Erro ao excluir usuário')
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
      alert('Erro ao excluir usuário')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Gerenciar Usuários</h2>

            {loading ? (
              <div className="text-center py-8">
                <p>Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.nome}
                            {user.id === currentUser?.id && (
                              <span className="ml-2 text-xs text-blue-600">(Você)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.user_type === 'ADMINISTRADOR'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.user_type || 'NORMAL'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.data_criacao
                              ? new Date(user.data_criacao).toLocaleDateString('pt-BR')
                              : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => handleEdit(user.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Editar
                            </Button>
                            {user.id !== currentUser?.id && (
                              <Button
                                variant="outline"
                                onClick={() => handleDeleteClick(user)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Excluir
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o usuário "{userToDelete.nome}"? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => {
                  setShowDeleteModal(false)
                  setUserToDelete(null)
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default UsersPage
