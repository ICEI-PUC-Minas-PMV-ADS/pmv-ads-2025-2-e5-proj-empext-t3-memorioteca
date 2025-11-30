import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Button, Select } from '@/components/ui'
import { ProjetosService } from '@/services/projetosService'
import { Projeto, ProjetosFilters } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


const ProjetosPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [filtros, setFiltros] = useState<ProjetosFilters>({
    titulo: '',
    descricao: '',
    data_criacao: '',
    page: 1,
    limit: 12
  })

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 12
  })

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const handleViewProject = (id: String) => {
    navigate(`/projects/${id}`);
  };

  const validarDataCriacao = () => {
    if (filtros.data_criacao) {

      const regexData = /^\d{4}-\d{2}-\d{2}$/
      if (!regexData.test(filtros.data_criacao)) {
        alert('Por favor, preencha a data de criação corretamente.')
        return false
      }

      const data = new Date(filtros.data_criacao + 'T00:00:00')
      if (isNaN(data.getTime())) {
        alert('Data de criação inválida. Por favor, verifique a data informada.')
        return false
      }

      const [ano, mes, dia] = filtros.data_criacao.split('-').map(Number)
      if (ano < 1900 || ano > 2100) {
        alert('Por favor, informe um ano válido entre 1900 e 2100.')
        return false
      }
      if (mes < 1 || mes > 12) {
        alert('Por favor, informe um mês válido entre 01 e 12.')
        return false
      }
      if (dia < 1 || dia > 31) {
        alert('Por favor, informe um dia válido.')
        return false
      }
    }
    return true
  }

  const carregarProjetos = async (filtrosCustomizados?: ProjetosFilters) => {
    if (!validarDataCriacao()) {
      return
    }

    setIsLoading(true)
    setError('')

    const filtrosParaUsar = filtrosCustomizados || filtros

    try {
      const response = await ProjetosService.listarProjetos(filtrosParaUsar)

      if (response.success) {
        setProjetos(response.data)
        setPagination(response.pagination)
      } else {
        setError(response.message || 'Erro ao carregar projetos')
        setProjetos([])
      }
    } catch (err) {
      console.error('Erro ao carregar projetos:', err)
      setError('Erro de conexão com o servidor')
      setProjetos([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    carregarProjetos()
  }, [])

  const handleFiltroChange = (campo: keyof ProjetosFilters, valor: string) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
      page: 1
    }))
  }

  const limparFiltros = () => {
    setFiltros({
      titulo: '',
      descricao: '',
      data_criacao: '',
      page: 1,
      limit: 12
    })
  }

  const formatarData = (dataString: string) => {
    if (!dataString) return ''
    const data = new Date(dataString)
  
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  const handlePaginacao = (novaPagina: number) => {
    const novosFiltros = {
      ...filtros,
      page: novaPagina
    }
    setFiltros(novosFiltros)
    carregarProjetos(novosFiltros)
  }

  const handleLimitChange = async (novoLimit: number) => {
    const novosFiltros = {
      ...filtros,
      limit: novoLimit,
      page: 1
    }

    setFiltros(novosFiltros)
    setPagination(prev => ({
      ...prev,
      itemsPerPage: novoLimit,
      currentPage: 1
    }))

    setIsLoading(true)
    setError('')

    try {
      const response = await ProjetosService.listarProjetos(novosFiltros)

      if (response.success) {
        setProjetos(response.data)
        setPagination(response.pagination)
      } else {
        setError(response.message || 'Erro ao carregar projetos')
        setProjetos([])
      }
    } catch (err) {
      console.error('Erro ao carregar projetos:', err)
      setError('Erro de conexão com o servidor')
      setProjetos([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4 pb-4">
            <div className="inline-block">
              <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              Projetos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore todos os projetos da Memorioteca
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="h-1 w-8 bg-primary/60 rounded"></div>
              <span>Catálogo</span>
              <div className="h-1 w-8 bg-primary/60 rounded"></div>
            </div>
            {user?.user_type === 'ADMINISTRADOR' && (
              <div className="pt-4">
                <Button 
                  onClick={handleCreateProject}
                  className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Cadastrar Novo Projeto
                </Button>
              </div>
            )}
          </div>

          <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white pb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                Filtros de Busca
              </CardTitle>
              <p className="text-gray-100 mt-2 relative z-10">Refine sua pesquisa</p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Input
                  label="Título"
                  placeholder="Buscar por título..."
                  value={filtros.titulo || ''}
                  onChange={(e) => handleFiltroChange('titulo', e.target.value)}
                />

                <Input
                  label="Descrição"
                  placeholder="Buscar por descrição..."
                  value={filtros.descricao || ''}
                  onChange={(e) => handleFiltroChange('descricao', e.target.value)}
                />

                <Input
                  label="Data de Criação"
                  type="date"
                  value={filtros.data_criacao || ''}
                  onChange={(e) => handleFiltroChange('data_criacao', e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={limparFiltros}
                  disabled={isLoading}
                  className="flex-1 border-2 hover:bg-gray-50 font-semibold group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Limpar Filtros
                </Button>
                <Button
                  onClick={() => carregarProjetos()}
                  disabled={isLoading}
                  loading={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Buscar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
                </div>
                <p className="text-lg font-medium text-primary">Carregando projetos...</p>
              </div>
            </div>
          )}

          {!isLoading && (
            <>
              {projetos.length === 0 ? (
                <Card className="shadow-2xl border border-primary/20 bg-white">
                  <CardContent className="py-16 text-center">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum projeto encontrado</h3>
                    <p className="text-gray-600 mb-6">
                      Não encontramos projetos com os filtros aplicados.
                    </p>
                    <Button variant="outline" onClick={limparFiltros} className="border-2 font-semibold">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Limpar Filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {projetos.map((projeto) => (
                      <Card key={projeto.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/30 bg-white">
                        <CardContent className="p-0" onClick={() => handleViewProject(projeto.id)}>
                          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
                            {projeto.url ? (
                              <img
                                src={projeto.url}
                                alt={projeto.titulo}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <span className="text-gray-400 text-4xl font-bold">
                                  {projeto.titulo.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                              {projeto.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                              {projeto.descricao}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Criado em {formatarData(projeto.data_criacao)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Itens por página:</span>
                        <Select
                          value={filtros.limit || 12}
                          onChange={(e) => handleLimitChange(Number(e.target.value))}
                          options={[
                            { value: 6, label: '6' },
                            { value: 12, label: '12' },
                            { value: 24, label: '24' },
                            { value: 48, label: '48' },
                            { value: 96, label: '96' }
                          ]}
                          className="w-20"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">
                          {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} de {pagination.totalItems}
                        </span>
                      </div>
                    </div>

                    {pagination.totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                        <Button
                          variant="outline"
                          disabled={pagination.currentPage === 1}
                          onClick={() => handlePaginacao(pagination.currentPage - 1)}
                          className="border-2 font-semibold"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Anterior
                        </Button>

                        <div className="flex gap-1">
                          {(() => {
                            const maxPagesToShow = 5
                            const pages = []
                            let startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2))
                            let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1)

                            if (endPage - startPage + 1 < maxPagesToShow) {
                              startPage = Math.max(1, endPage - maxPagesToShow + 1)
                            }

                            // Primeira página
                            if (startPage > 1) {
                              pages.push(
                                <Button
                                  key={1}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePaginacao(1)}
                                >
                                  1
                                </Button>
                              )
                              if (startPage > 2) {
                                pages.push(
                                  <span key="ellipsis-start" className="px-2">...</span>
                                )
                              }
                            }

                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <Button
                                  key={i}
                                  variant={i === pagination.currentPage ? 'primary' : 'outline'}
                                  size="sm"
                                  onClick={() => handlePaginacao(i)}
                                >
                                  {i}
                                </Button>
                              )
                            }

                            if (endPage < pagination.totalPages) {
                              if (endPage < pagination.totalPages - 1) {
                                pages.push(
                                  <span key="ellipsis-end" className="px-2">...</span>
                                )
                              }
                              pages.push(
                                <Button
                                  key={pagination.totalPages}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePaginacao(pagination.totalPages)}
                                >
                                  {pagination.totalPages}
                                </Button>
                              )
                            }

                            return pages
                          })()}
                        </div>

                        <Button
                          variant="outline"
                          disabled={pagination.currentPage === pagination.totalPages}
                          onClick={() => handlePaginacao(pagination.currentPage + 1)}
                          className="border-2 font-semibold"
                        >
                          Próxima
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProjetosPage