import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Button, Select } from '@/components/ui'
import { ProjetosService } from '@/services/projetosService'
import { Projeto, ProjetosFilters } from '@/types'

const ProjetosPage = () => {
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

  const carregarProjetos = async () => {
    if (!validarDataCriacao()) {
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await ProjetosService.listarProjetos(filtros)
      
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
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR')
  }

  const handlePaginacao = (novaPagina: number) => {
    setFiltros(prev => ({
      ...prev,
      page: novaPagina
    }))
    setTimeout(() => carregarProjetos(), 0)
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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Projetos</h1>
              <p className="text-muted-foreground">
                Explore todos os projetos da Memorioteca
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros de Busca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={limparFiltros}
                  disabled={isLoading}
                >
                  Limpar Filtros
                </Button>
                <Button
                  onClick={carregarProjetos}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {isLoading ? 'Buscando...' : 'Buscar'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-muted-foreground">Carregando projetos...</span>
            </div>
          )}

          {!isLoading && (
            <>
              {projetos.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      Nenhum projeto encontrado com os filtros aplicados.
                    </p>
                    <Button variant="outline" onClick={limparFiltros}>
                      Limpar Filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {projetos.map((projeto) => (
                      <Card key={projeto.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-0">
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

                  {/* Controles de Paginação */}
                  <div className="mt-8 space-y-4">
                    {/* Seletor de itens por página */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Itens por página:</span>
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
                      
                      <div className="text-sm text-muted-foreground">
                        Mostrando {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} de {pagination.totalItems} projetos
                      </div>
                    </div>

                    {/* Navegação de páginas */}
                    {pagination.totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          disabled={pagination.currentPage === 1}
                          onClick={() => handlePaginacao(pagination.currentPage - 1)}
                        >
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
                            
                            // Páginas do meio
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
                            
                            // Última página
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
                        >
                          Próxima
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
    </div>
  )
}

export default ProjetosPage