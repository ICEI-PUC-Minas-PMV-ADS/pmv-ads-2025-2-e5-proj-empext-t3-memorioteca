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
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          {!institucional ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
          ) : (
            <>
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-bold text-left">
                    Sobre a Memorioteca
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-lg leading-relaxed text-justify space-y-4">
                    {/* Imagem flutuando à direita */}
                    <img
                      src={institucional.imagem_url}
                      alt="Imagem institucional"
                      className="w-96 h-96 object-cover rounded-md shadow-lg float-right ml-6 mb-4"
                    />

                    {/* Texto flui ao lado e depois ocupa toda largura */}
                    {institucional.texto.split('\n').map((paragrafo, idx) => (
                      <p key={idx}>{paragrafo}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Botão Editar (somente para ADMINISTRADOR) */}
              {user?.user_type === 'ADMINISTRADOR' && (
                <div className="mt-6 text-center">
                  <Button onClick={() => navigate('/institucional/editar')}>
                    Editar
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default InstitucionalPage