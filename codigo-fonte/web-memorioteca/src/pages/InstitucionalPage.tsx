import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const InstitucionalPage = () => {
  const [institucional, setInstitucional] = useState<{
    texto: string
    imagem_url: string
  } | null>(null)

  useEffect(() => {
    axios.get('http://localhost:3001/institucional')
      .then(res => setInstitucional(res.data))
      .catch(err => console.error('Erro ao buscar institucional:', err))
  }, [])

  if (!institucional) return <p>Carregando...</p>

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted">
      <div className="w-full max-w-4xl">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Sobre a Memorioteca
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-justify">
              {institucional.texto}
            </p>

            <div className="flex justify-center">
              <img
                src={institucional.imagem_url}
                alt="Imagem institucional"
                className="max-w-full h-auto rounded-md shadow-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InstitucionalPage