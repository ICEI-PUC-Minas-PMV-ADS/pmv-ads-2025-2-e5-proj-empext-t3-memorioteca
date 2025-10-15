import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui'
import { ApiService, type ProjectFeaturedDto } from '@/services/api'

type Project = {
  id: string
  titulo: string
  resumo?: string
  capaUrl?: string
  createdAt: string // ISO
}

function useFeaturedProjects() {
  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)

        // chamada real ao backend
        const dto = await ApiService.getFeaturedProjects(3)

        if (!mounted) return

        // mapeia snake_case (back) -> camelCase (UI)
        const normalized: Project[] = dto.map((p: ProjectFeaturedDto) => ({
          id: p.id,
          titulo: p.titulo,
          resumo: p.descricao,
          capaUrl: p.url || '',
          createdAt: p.data_criacao,
        }))

        setData(normalized)
      } catch (e) {
        setError('Falha ao carregar destaques.')
      } finally {
        setLoading(false)
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

  const isEmpty = !loading && !error && (data?.length ?? 0) === 0

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

        {isEmpty && (
          <div className="mb-4 p-3 text-sm text-muted-foreground bg-muted/10 border border-muted/20 rounded-md">
            Nenhum projeto cadastrado ainda.
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
