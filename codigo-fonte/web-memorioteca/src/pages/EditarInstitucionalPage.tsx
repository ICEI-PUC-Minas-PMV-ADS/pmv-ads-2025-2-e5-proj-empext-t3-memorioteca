import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInstitucional, updateInstitucional } from '@/services/institucionalService'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Input, Button } from '@/components/ui'
import Textarea from '@/components/ui/Textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

export default function EditarInstitucionalPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [texto, setTexto] = useState<string>('')
  const [imagemUrl, setImagemUrl] = useState<string>('')
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState<string>('')
  //const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    // Proteção de acesso: redireciona se não for ADMINISTRADOR
    if (!user || user.user_type !== 'ADMINISTRADOR') {
      navigate('/')
      return
    }

    async function carregarDados() {
      setCarregando(true)
      const dados = await getInstitucional()
      if (dados) {
        setTexto(dados.texto || '')
        setImagemUrl(dados.imagem_url || '')
      } else {
        setErro('Erro ao carregar dados institucionais.')
      }
      setCarregando(false)
    }

    carregarDados()
  }, [user, navigate])

  // const handleImagemUpload = async (file: File): Promise<string | null> => {
  //   try {
  //     setUploading(true)
  //     const fileName = `${Date.now()}-${file.name}`
  //     const filePath = `public/${fileName}`

  //     const { error } = await supabase.storage
  //       .from('Institucional')
  //       .upload(filePath, file, { upsert: true })

  //     if (error) {
  //       console.error('Erro ao fazer upload:', error)
  //       alert('Erro ao fazer upload da imagem.')
  //       return null
  //     }

  //     const { data: publicUrlData } = supabase.storage
  //       .from('Institucional')
  //       .getPublicUrl(filePath)

  //     return publicUrlData.publicUrl
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  const handleSalvar = async () => {
    if (!texto || texto.trim().length < 10) {
      alert('O texto institucional deve ter pelo menos 10 caracteres.')
      return
    }

    if (!imagemUrl) {
      alert('É necessário enviar uma imagem.')
      return
    }

    const sucesso = await updateInstitucional({ texto, imagemUrl })
    if (sucesso) {
      alert('Conteúdo atualizado com sucesso!')
      navigate('/institucional')
    } else {
      alert('Erro ao atualizar o conteúdo.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {carregando ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
                </div>
                <p className="text-lg font-medium text-primary">Carregando conteúdo institucional...</p>
              </div>
            </div>
          ) : erro ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 max-w-md shadow-xl">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-red-100 rounded-full p-4">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-center text-red-700 font-semibold text-lg">{erro}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4 pb-4">
                <div className="inline-block">
                  <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  Editar Página Institucional
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Gerencie o conteúdo e a imagem da página institucional com facilidade
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                  <span>Área Administrativa</span>
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white hover:shadow-primary/20 transition-all duration-300 flex flex-col">
                  <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      Editor de Conteúdo
                    </CardTitle>
                    <p className="text-gray-100 mt-2 relative z-10">Edite o texto e a imagem institucional</p>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-8 px-6 flex-1">
                    <div className="space-y-3">
                      <Textarea
                        label="Texto institucional"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Digite o texto institucional..."
                        rows={12}
                        required
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${texto.length >= 10 ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></div>
                          <p className={`text-sm font-medium ${texto.length >= 10 ? 'text-green-600' : 'text-amber-600'}`}>
                            {texto.length} caracteres {texto.length < 10 && '(mínimo: 10)'}
                          </p>
                        </div>
                        {texto.length >= 10 && (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            Válido
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Input
                        label="URL da Imagem"
                        type="text"
                        name="url"
                        value={imagemUrl || ""}
                        onChange={(e) => setImagemUrl(e.target.value)}
                        placeholder="Cole a URL da imagem aqui (ex: https://exemplo.com/imagem.jpg)"
                      />
                      {imagemUrl && (
                        <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          URL válida
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col sm:flex-row gap-3 bg-gray-50 px-6 py-5 mt-auto border-t border-gray-200">
                    <Button 
                      onClick={() => navigate('/institucional')} 
                      variant="outline"
                      className="w-full sm:w-auto hover:bg-gray-100 border-2 font-semibold group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSalvar}
                      className="w-full sm:flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Salvar alterações
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white hover:shadow-primary/20 transition-all duration-300">
                  <CardHeader className="bg-primary/90 text-white pb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      Pré-visualização ao Vivo
                    </CardTitle>
                    <p className="text-gray-100 mt-2 relative z-10">Veja como ficará o conteúdo</p>
                  </CardHeader>

                  <CardContent className="pt-8 px-6 space-y-6">
                    {imagemUrl ? (
                      <div className="space-y-4">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gray-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent">
                            <img
                              src={imagemUrl}
                              alt="Pré-visualização"
                              className="w-full h-auto object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Erro+ao+carregar+imagem'
                              }}
                            />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-500 rounded-full p-1">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <p className="text-sm font-semibold text-green-800">
                              Imagem carregada com sucesso
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gray-300 rounded-2xl blur opacity-10"></div>
                        <div className="relative flex items-center justify-center h-80 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-500 transition-colors duration-300">
                          <div className="text-center text-gray-400 space-y-4 p-8">
                            <div className="relative inline-block">
                              <div className="absolute inset-0 bg-gray-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-base font-semibold text-gray-500">Nenhuma imagem selecionada</p>
                              <p className="text-sm text-gray-400 mt-2">Cole a URL acima para visualizar a imagem</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {texto && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 pb-3 border-b-2 border-primary/20">
                          <div className="bg-primary rounded-lg p-2">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-primary text-lg">
                            Texto institucional
                          </h3>
                        </div>
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gray-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>
                          <div className="relative bg-white rounded-xl p-6 border-2 border-gray-100 max-h-80 overflow-y-auto shadow-inner hover:shadow-md transition-shadow duration-300">
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                              {texto}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
``