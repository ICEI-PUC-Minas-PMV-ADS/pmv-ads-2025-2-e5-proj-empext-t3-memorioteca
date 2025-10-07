import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectData, ProjectService } from '@/services/projectService'
import Button from '@/components/ui/Button'

const ProjetoPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [projeto, setProjeto] = useState<ProjectData | null>(null)

  useEffect(() => {
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
    try {
      await ProjectService.deleteProject(id)
      navigate('/projects')
    } catch (err) {
      console.error('Erro ao deletar projeto:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!projeto && !showErrorModal ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Carregando...</p>
        </div>
      ) : projeto ? (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Coluna da esquerda - Conteúdo do projeto */}
            <div className="flex flex-col h-[600px]">
              <h1 className="text-4xl font-bold uppercase mb-6">
                {projeto.titulo}
              </h1>

              <div className="flex-1 overflow-y-auto text-justify space-y-4 pr-4 mb-6">
                {projeto.descricao.split('\n').map((paragrafo, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragrafo}
                  </p>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                {projeto.nome_autor && (
                  <p className="font-semibold text-center">AUTOR: {projeto.nome_autor}</p>
                )}
                {projeto.data_inicio && (
                  <p className="text-sm">Data Início: {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}</p>
                )}
                {projeto.data_fim && (
                  <p className="text-sm">Data Fim: {new Date(projeto.data_fim).toLocaleDateString('pt-BR')}</p>
                )}
                {projeto.data_criacao && (
                  <p className="text-sm text-gray-500">Criado em: {new Date(projeto.data_criacao).toLocaleDateString('pt-BR')}</p>
                )}
                {projeto.data_atualizacao && (
                  <p className="text-sm text-gray-500">Atualizado em: {new Date(projeto.data_atualizacao).toLocaleDateString('pt-BR')}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleEditar}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  EDITAR PROJETO
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                >
                  DELETAR PROJETO
                </Button>
              </div>
            </div>

            {/* Coluna da direita - Imagem */}
            <div className="flex items-start justify-center">
              {projeto.url ? (
                <img
                  src={projeto.url}
                  alt={projeto.titulo}
                  className="w-full h-[600px] object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal de Confirmação */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja deletar o projeto "{projeto?.titulo}"? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeletar}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Erro */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-red-600">Erro ao Carregar Projeto</h2>
            <p className="text-gray-600 mb-6">
              Não foi possível recuperar os dados do projeto.
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjetoPage