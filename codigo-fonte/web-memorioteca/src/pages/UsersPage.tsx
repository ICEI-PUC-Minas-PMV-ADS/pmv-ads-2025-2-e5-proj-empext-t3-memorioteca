import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

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
        const response = await fetch(`${API_BASE_URL}/user`, {
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
      const response = await fetch(`${API_BASE_URL}/user/${userToDelete.id}`, {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
                </div>
                <p className="text-lg font-medium text-primary">Carregando usuários...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4 pb-4">
                <div className="inline-block">
                  <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  Gerenciar Usuários
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Administre todos os usuários cadastrados no sistema
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                  <span>Área Administrativa</span>
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                </div>
              </div>

              {users.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <div className="inline-block mb-6">
                    <div className="bg-gray-100 rounded-full p-6">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum usuário encontrado</h3>
                  <p className="text-gray-500">Quando houver usuários cadastrados, eles aparecerão aqui.</p>
                </div>
              ) : (
              <>
                <div className="hidden md:block bg-white rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
                  <div className="bg-primary text-white p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold">Lista de Usuários</h2>
                      <span className="ml-auto bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {users.length} {users.length === 1 ? 'usuário' : 'usuários'}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nome
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data de Criação
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {user.nome}
                                {user.id === currentUser?.id && (
                                  <span className="ml-2 text-xs text-blue-600">(Você)</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.user_type === 'ADMINISTRADOR'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.user_type || 'NORMAL'}
                              </span>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.data_criacao
                                  ? new Date(user.data_criacao).toLocaleDateString('pt-BR')
                                  : '-'}
                              </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  onClick={() => handleEdit(user.id)}
                                  className="text-primary border-primary hover:bg-primary hover:text-white transition-colors font-semibold"
                                >
                                  Editar
                                </Button>
                                {user.id !== currentUser?.id && (
                                  <Button
                                    variant="outline"
                                    onClick={() => handleDeleteClick(user)}
                                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors font-semibold"
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
                </div>

                <div className="md:hidden space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="group relative">
                      <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                      <div className="relative bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 hover:border-primary/30 transition-all duration-300">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase mb-1">Nome</div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.nome}
                            {user.id === currentUser?.id && (
                              <span className="ml-2 text-xs text-blue-600">(Você)</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase mb-1">Email</div>
                          <div className="text-sm text-gray-900 break-all">{user.email}</div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Tipo</div>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.user_type === 'ADMINISTRADOR'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.user_type || 'NORMAL'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Data de Criação</div>
                            <div className="text-sm text-gray-900">
                              {user.data_criacao
                                ? new Date(user.data_criacao).toLocaleDateString('pt-BR')
                                : '-'}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => handleEdit(user.id)}
                              className="flex-1 text-primary border-primary hover:bg-primary hover:text-white transition-colors text-sm font-semibold"
                            >
                              Editar
                            </Button>
                            {user.id !== currentUser?.id && (
                              <Button
                                variant="outline"
                                onClick={() => handleDeleteClick(user)}
                                className="flex-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm font-semibold"
                              >
                                Excluir
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
              </>
              )}
            </div>
          )}
        </div>
      </main>

      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Confirmar Exclusão</h2>
              <p className="text-gray-600">
                Tem certeza que deseja excluir o usuário <span className="font-semibold text-gray-900">"{userToDelete.nome}"</span>? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowDeleteModal(false)
                  setUserToDelete(null)
                }}
                variant="outline"
                className="flex-1 border-2 hover:bg-gray-50 font-semibold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirmar Exclusão
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
