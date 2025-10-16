import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DestaquesPage from './DestaquesPage'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-10">
         
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Bem-vindo{user?.nome ? `, ${user.nome}` : ''} à Memorioteca!
            </h2>
            <p className="text-lg text-muted-foreground">
              {user?.email ? 'Você está logado com sucesso.' : 'Acesse sua conta para aproveitar todos os recursos.'}
            </p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2 text-xl">Explorar Projetos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore todos os projetos disponíveis na Memorioteca
              </p>
              
              <Button className="w-full" asChild>
                <Link to="/projetos">Ver Projetos</Link>
              </Button>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2 text-xl">Página Institucional</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conheça mais sobre a Memorioteca
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/institucional">Saiba Mais</Link>
              </Button>
            </div>
          </div>

         
          <section aria-labelledby="destaques-title" className="mt-12">
            <h3 id="destaques-title" className="sr-only">Destaques</h3>
            <DestaquesPage />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
