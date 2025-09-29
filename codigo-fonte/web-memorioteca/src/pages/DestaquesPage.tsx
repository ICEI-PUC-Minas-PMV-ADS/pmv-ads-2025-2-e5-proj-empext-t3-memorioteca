import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui'
// import { Link } from 'react-router-dom' // Descomente quando tiver rota de detalhes

// ------------------------------
// Tipos
// ------------------------------
type Project = {
  id: string
  titulo: string
  resumo?: string
  capaUrl?: string
  createdAt: string // ISO
}

// ------------------------------
// Mock de dados (substituir pelo backend depois)
// ------------------------------
const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-001',
    titulo: 'Atlas da Memória',
    resumo: 'Mapeamento afetivo dos acervos e autores locais.',
    capaUrl: '',
    createdAt: '2025-09-17T10:12:00Z',
  },
  {
    id: 'p-002',
    titulo: 'Natureza',
    resumo: 'Historias de prezervação ambiental guiada por alunos',
    capaUrl: '',
    createdAt: '2025-09-20T13:45:00Z',
  },
  {
    id: 'p-003',
    titulo: 'Laboratório de Zines',
    resumo: 'Fanzines impressos e digitais produzidos pelos alunos.',
    capaUrl: '',
    createdAt: '2025-09-25T08:30:00Z',
  },
  {
    id: 'p-004',
    titulo: 'Acervo Vivo',
    resumo: 'Histórias orais com a comunidade e arquivo sonoro.',
    capaUrl: '',
    createdAt: '2025-09-27T16:05:00Z',
  },
]

// NÃO ESQUECER TROCAR o mock por chamada real quando o backend estiver pronto

function useFeaturedProjects() {
  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)

        //BACKEND FAZER ROTA <AQUI> !!!!
        

        // SIMULAR
        await new Promise(r => setTimeout(r, 500))
        if (!mounted) return
        const top3 = [...MOCK_PROJECTS]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)

        setData(top3)
      } catch (e: any) {
        if (mounted) setError('Falha ao carregar destaques.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return { data, loading, error }
}

function SquareSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <div className="w-full aspect-square rounded-lg bg-muted animate-pulse" />
        <div className="mt-4 h-4 w-3/5 rounded bg-muted animate-pulse" />
        <div className="mt-2 h-3 w-4/5 rounded bg-muted animate-pulse" />
        <div className="mt-6 h-9 w-28 rounded bg-muted animate-pulse" />
      </div>
    </div>
  )
}


function FeaturedSquare({ project }: { project: Project }) {
  const date = useMemo(() => new Date(project.createdAt), [project.createdAt])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        
        <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
         
          {project.capaUrl ? (
            <img
              src={project.capaUrl}
              alt={project.titulo}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-sm text-muted-foreground">Prévia do projeto</div>
          )}
        </div>

        
        <div className="mt-4">
          <CardTitle className="line-clamp-2">{project.titulo}</CardTitle>
          {project.resumo && (
            <CardDescription className="mt-1 line-clamp-2">{project.resumo}</CardDescription>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            Publicado em {date.toLocaleDateString('pt-BR')}
          </div>
        </div>

    
        <CardFooter className="px-0 pt-4">
          <Button className="w-full sm:w-auto">Ver projeto</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

const DestaquesPage: React.FC = () => {
  const { data, loading, error } = useFeaturedProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Projetos em destaque</CardTitle>
            <CardDescription>
              Exibindo os três projetos mais recentes cadastrados na Memorioteca.
            </CardDescription>
          </CardHeader>
        </Card>

        {error && (
          <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <SquareSkeleton key={`sk-${i}`} />)}

          {!loading && data?.map(p => <FeaturedSquare key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  )
}

export default DestaquesPage
