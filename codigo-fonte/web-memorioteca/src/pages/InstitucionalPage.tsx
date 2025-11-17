import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

const InstitucionalPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [institucional, setInstitucional] = useState<{
    texto: string
    imagem_url: string
  } | null>(null)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/institucional`)
      .then(res => setInstitucional(res.data))
      .catch(err => console.error('Erro ao buscar institucional:', err))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {!institucional ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
                </div>
                <p className="text-lg font-medium text-primary">Carregando conteúdo...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4 pb-4">
                <div className="inline-block">
                  <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  Sobre a Memorioteca
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Conheça nossa história e missão
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                  <span>Institucional</span>
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                </div>
              </div>

              <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white">
                <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                  <CardTitle className="text-3xl font-bold flex items-center gap-3 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Nossa História
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="group sticky top-8">
                        <div className="absolute -inset-1 bg-gray-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
                          <img
                            src={institucional.imagem_url}
                            alt="Imagem institucional"
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Memorioteca'
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed space-y-6">
                          {institucional.texto.split('\n').filter(p => p.trim()).map((paragrafo) => (
                            <p key={paragrafo.substring(0, 50)} className="text-base sm:text-lg text-justify first:text-xl first:font-medium first:text-primary">
                              {paragrafo}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {user?.user_type === 'ADMINISTRADOR' && (
                <div className="flex justify-center pb-4">
                  <Button 
                    onClick={() => navigate('/institucional/editar')}
                    className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group px-8 py-6 text-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar Conteúdo
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default InstitucionalPage