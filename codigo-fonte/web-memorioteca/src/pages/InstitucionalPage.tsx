import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

const InstitucionalPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [institucional, setInstitucional] = useState<{
    texto: string
    imagem_url: string
  } | null>(null)

  useEffect(() => {
    axios.get('http://localhost:3001/institucional')
      .then(res => setInstitucional(res.data))
      .catch(err => console.error('Erro ao buscar institucional:', err))
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
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
                  {/* Layout responsivo */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    
                    {/* Texto */}
                    <div className="flex-1 text-lg leading-relaxed text-justify space-y-4">
                      {institucional.texto.split('\n').map((paragrafo, idx) => (
                        <p key={idx}>{paragrafo}</p>
                      ))}
                    </div>

                    {/* Imagem */}
                    <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                      <img
                        src={institucional.imagem_url}
                        alt="Imagem institucional"
                        className="max-w-full h-auto rounded-md shadow-md"
                      />
                    </div>
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