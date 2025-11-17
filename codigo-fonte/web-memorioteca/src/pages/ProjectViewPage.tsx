import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectData, ProjectService } from '@/services/projectService'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ProjetoPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [projeto, setProjeto] = useState<ProjectData | null>(null)

  useEffect(() => {
    if (!id) return
    ProjectService.getProject(id)
      .then(res => {console.log(res); setProjeto(res)})
      .catch(err => {
        console.error('Erro ao recuperar projeto:', err)
        setShowErrorModal(true)
      })
  }, [id])

  const handleEditar = () => {
    navigate(`/projects/${id}/edit`)
  }

  const handleDeletar = async () => {
    if (!id) return
    try {
      await ProjectService.deleteProject(id)
      navigate('/projects')
    } catch (err) {
      console.error('Erro ao deletar projeto:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 overflow-y-auto">
        {!projeto && !showErrorModal ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
              </div>
              <p className="text-lg font-medium text-primary">Carregando projeto...</p>
            </div>
          </div>
        ) : projeto ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-2xl border border-primary/20 p-8 flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary rounded-lg p-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h1 className="text-3xl font-bold text-gray-900 uppercase">
                        {projeto.titulo}
                      </h1>
                    </div>
                    <div className="h-1 w-20 bg-primary rounded"></div>
                  </div>

                  <div className="flex-1 overflow-y-auto text-justify space-y-4 pr-2 mb-6 max-h-[400px]">
                    {projeto.descricao.split('\n').map((paragrafo, index) => (
                      <p key={index} className="leading-relaxed text-gray-700">
                        {paragrafo}
                      </p>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-3 border-2 border-gray-200">
                    {projeto.nome_autor && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="font-semibold text-gray-900">Autor: <span className="text-primary">{projeto.nome_autor}</span></p>
                      </div>
                    )}
                    {projeto.data_inicio && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-700">Início: {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}</p>
                      </div>
                    )}
                    {projeto.data_fim && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-700">Fim: {new Date(projeto.data_fim).toLocaleDateString('pt-BR')}</p>
                      </div>
                    )}
                    {projeto.data_criacao && (
                      <p className="text-xs text-gray-500 pt-2 border-t border-gray-300">Criado em: {new Date(projeto.data_criacao).toLocaleDateString('pt-BR')}</p>
                    )}
                    {projeto.data_atualizacao && (
                      <p className="text-xs text-gray-500">Atualizado em: {new Date(projeto.data_atualizacao).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>

                  {projeto.url_drive && (user?.user_type === 'ADMINISTRADOR' || projeto.drive_publico) && (
                    <div className="mt-4">
                      <a
                        href={projeto.url_drive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group w-full justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        Acessar Drive/Documentos
                      </a>
                    </div>
                  )}

                  {user?.user_type === 'ADMINISTRADOR' && (
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                      <Button
                        onClick={handleEditar}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </Button>
                      <Button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Excluir
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-center">
                  <div className="group relative w-full">
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-4 overflow-hidden">
                      {projeto.url ? (
                        <img
                          src={projeto.url}
                          alt={projeto.titulo}
                          className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-500 font-medium">Sem imagem</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {showDeleteModal && (
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
                Tem certeza que deseja deletar o projeto <span className="font-semibold text-gray-900">"{projeto?.titulo}"</span>? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="outline"
                className="flex-1 border-2 hover:bg-gray-50 font-semibold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeletar}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirmar Exclusão
              </Button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-red-600">Erro ao Carregar Projeto</h2>
              <p className="text-gray-600">
                Não foi possível recuperar os dados do projeto.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate(-1)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-semibold"
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default ProjetoPage