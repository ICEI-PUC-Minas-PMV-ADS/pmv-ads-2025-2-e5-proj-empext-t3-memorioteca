import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui'
import Footer from '@/components/Footer'
import { useNavigate } from 'react-router-dom' 

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate() 

  const handleProjects = () => {
    navigate('/projects') 
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Memorioteca</h1>
              <p className="text-muted-foreground">Olá, {user?.nome}!</p>
            </div>
            <Button
              variant="outline"
              onClick={handleProjects}
            >
              Projetos
            </Button>
            <Button
              variant="outline"
              onClick={logout}
            >
              Sair
            </Button>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Bem-vindo a Memorioteca!
            </h2>
            <p className="text-lg text-muted-foreground">
              Você está logado com sucesso.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Suas Informações</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Nome:</strong> {user?.nome}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Membro desde:</strong> {user?.data_criacao ? new Date(user.data_criacao).toLocaleDateString('pt-BR') : 'N/A'}</p>
                <p><strong>Último login:</strong> {user?.ultimo_login ? new Date(user.ultimo_login).toLocaleDateString('pt-BR') : 'Primeiro acesso'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DashboardPage