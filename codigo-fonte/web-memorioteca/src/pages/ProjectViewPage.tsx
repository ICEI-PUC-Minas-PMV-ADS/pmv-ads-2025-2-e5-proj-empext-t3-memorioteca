import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ApiService } from '@/services/api'
import {  useAuth } from '@/contexts/AuthContext'

const ProjetoPage = () => {
  const { user } = useAuth()

  const [projeto, setProjeto] = useState<{
    titulo: string
    descricao: string
  } | null>(null)

  useEffect(() =>  {
    
    ApiService.getProject('ffca1494-198a-4d00-a545-d12eabdbac1f','user')
      .then(res => setProjeto(res.data))
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