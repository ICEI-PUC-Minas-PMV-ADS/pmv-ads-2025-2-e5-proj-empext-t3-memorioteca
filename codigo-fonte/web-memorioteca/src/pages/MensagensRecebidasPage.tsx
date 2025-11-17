import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { MensagemResposta } from '@/services/faleConoscoService'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAuth } from '@/contexts/AuthContext'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

dayjs.extend(utc)
dayjs.extend(timezone)

export default function MensagensRecebidasPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [mensagens, setMensagens] = useState<MensagemResposta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Proteção: redireciona se não for ADMINISTRADOR
    if (!user || user.user_type !== 'ADMINISTRADOR') {
      navigate('/')
      return
    }

    async function fetchMensagens() {
      try {
        const response = await axios.get<MensagemResposta[]>(`${API_BASE_URL}/fale-conosco`)
        setMensagens(response.data)
      } catch (err) {
        setError('Erro ao carregar mensagens.')
      } finally {
        setLoading(false)
      }
    }

    fetchMensagens()
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <div className="absolute inset-0 inline-block h-16 w-16 animate-ping rounded-full border-4 border-solid border-primary/40 opacity-20"></div>
                </div>
                <p className="text-lg font-medium text-primary">Carregando mensagens...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 max-w-md shadow-xl">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-red-100 rounded-full p-4">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-center text-red-700 font-semibold text-lg">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4 pb-4">
                <div className="inline-block">
                  <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                  Mensagens Recebidas
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Gerencie todas as mensagens enviadas pelos usuários
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                  <span>Área Administrativa</span>
                  <div className="h-1 w-8 bg-primary/60 rounded"></div>
                </div>
              </div>

              <Card className="shadow-2xl border border-primary/20 overflow-hidden bg-white">
                <CardHeader className="bg-primary text-white pb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full -ml-24 -mb-24"></div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                      </svg>
                    </div>
                    Caixa de Entrada
                    {mensagens.length > 0 && (
                      <span className="ml-auto bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {mensagens.length} {mensagens.length === 1 ? 'mensagem' : 'mensagens'}
                      </span>
                    )}
                  </CardTitle>
                  <p className="text-gray-100 mt-2 relative z-10">Todas as mensagens do Fale Conosco</p>
                </CardHeader>

                <CardContent className="p-8">
                  {mensagens.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="inline-block mb-6">
                        <div className="bg-gray-100 rounded-full p-6">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma mensagem recebida</h3>
                      <p className="text-gray-500">Quando alguém enviar uma mensagem, ela aparecerá aqui.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mensagens.map((msg) => (
                        <div 
                          key={msg.id} 
                          className="group relative"
                        >
                          <div className="absolute -inset-1 bg-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                          <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-xl hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                              <div className="flex items-start gap-3">
                                <div className="bg-primary/10 rounded-lg p-2 mt-1">
                                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900">{msg.nome}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {msg.email}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-lg font-medium whitespace-nowrap">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {dayjs.utc(msg.data_envio).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm')}
                              </div>
                            </div>
                            <div className="bg-white border-l-4 border-primary/40 p-4 rounded-lg">
                              <p className="text-gray-700 leading-relaxed">{msg.mensagem}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}