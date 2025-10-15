import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DestaquesPage from './DestaquesPage'

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-lg text-center">
          {/* Título */}
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Bem-vindo à Memorioteca!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Você está logado com sucesso.
          </p>
          {/* Card centralizado */}
          {/* <div className="bg-card p-6 rounded-lg border shadow-md text-left">
            <h3 className="font-semibold mb-4 text-xl text-center">Suas Informações</h3>
            <div className="space-y-3 text-base text-muted-foreground">
              <p><strong>Nome:</strong> {user?.nome}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p>
                <strong>Membro desde:</strong>{' '}
                {user?.data_criacao
                  ? new Date(user.data_criacao).toLocaleDateString('pt-BR')
                  : 'N/A'}
              </p>
              <p>
                <strong>Último login:</strong>{' '}
                {user?.ultimo_login
                  ? new Date(user.ultimo_login).toLocaleDateString('pt-BR')
                  : 'Primeiro acesso'}
              </p>
            </div>
          </div> */}
        </div>
          <DestaquesPage/>
      </main>
      <Footer />
    </div>
  )
}

export default DashboardPage
