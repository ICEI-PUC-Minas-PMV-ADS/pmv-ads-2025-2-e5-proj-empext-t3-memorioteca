import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui'
import Footer from '@/components/Footer'
import FeaturedProjectsPanel from '@/components/ProjetosDestaques/FeaturedProjectsPanel'



const projetosDeExemplo = [
  { 
    id: 1, 
    titulo: 'Digitalização do Acervo Histórico', 
    resumo: 'Um esforço para preservar documentos raros do século XIX.',
    imagemUrl: 'https://via.placeholder.com/400x200/DDE/000?text=Projeto+1' 
  },
  { 
    id: 2, 
    titulo: 'Oficinas de Leitura para Crianças', 
    resumo: 'Incentivando a próxima geração de leitores com atividades lúdicas.',
    imagemUrl: 'https://via.placeholder.com/400x200/EED/000?text=Projeto+2' 
  },
  { 
    id: 3, 
    titulo: 'Clube do Livro: Clássicos Modernos', 
    resumo: 'Discussões mensais sobre as obras que definiram o século XX.',
    imagemUrl: 'https://via.placeholder.com/400x200/DED/000?text=Projeto+3' 
  },
];

const DashboardPage = ( ) => {
  const { user, logout } = useAuth()

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

         
          <section className="my-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Projetos em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             
              {projetosDeExemplo.map((projeto) => (
                <div key={projeto.id} className="border rounded-lg p-4 shadow-md bg-card">
                  <img src={projeto.imagemUrl} alt={projeto.titulo} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{projeto.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{projeto.resumo}</p>
                </div>
              ))}
            </div>
          </section>
         
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
      </main>
      <Footer />
    </div>
  )
}

export default DashboardPage
