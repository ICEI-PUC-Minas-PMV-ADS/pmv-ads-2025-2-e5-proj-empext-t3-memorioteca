import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ApiService } from '@/services/api'
import { useParams } from 'react-router-dom';

const ProjetoPage = () => {
  
  const { id } = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<{
    titulo: string
    descricao: string
  } | null>(null)

  useEffect(() =>  {
    
    ApiService.getProject(id)
      .then(res => setProjeto(res))
      .catch(err => console.error('Erro ao recuperar projeto:', err))
  }, [])

  if (!projeto) return <p>Carregando...</p>

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted">
      <div className="w-full max-w-4xl">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
               {projeto.titulo}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-justify">
              {projeto.descricao}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjetoPage