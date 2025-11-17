import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DestaquesPage from './DestaquesPage'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="animate-in fade-in duration-500">
            <div className="text-center space-y-4 pb-4">
              <div className="inline-block">
                <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                Bem-vindo{user?.nome ? `, ${user.nome}` : ''}!
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {user?.email ? 'Você está logado com sucesso. Explore os recursos da Memorioteca.' : 'Acesse sua conta para aproveitar todos os recursos.'}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
                <span>Dashboard</span>
                <div className="h-1 w-8 bg-primary/60 rounded"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <div className="group relative h-full">
                <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white p-8 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">Explorar Projetos</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                    Explore todos os projetos disponíveis na Memorioteca
                  </p>
              
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 font-semibold group/btn" asChild>
                    <Link to="/projetos">
                      <span>Ver Projetos</span>
                      <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="group relative h-full">
                <div className="absolute -inset-1 bg-gray-400/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white p-8 rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gray-700 rounded-lg p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">Página Institucional</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                    Conheça mais sobre a Memorioteca
                  </p>
                  <Button variant="outline" className="w-full border-2 hover:bg-gray-50 font-semibold group/btn" asChild>
                    <Link to="/institucional">
                      <span>Saiba Mais</span>
                      <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <section aria-labelledby="destaques-title" className="mt-24">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-primary rounded-xl p-3 shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Projetos em Destaque</h2>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Confira os projetos selecionados que fazem parte da história da Memorioteca
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="h-1 w-12 bg-primary/60 rounded"></div>
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" clipRule="evenodd" />
                  </svg>
                  <div className="h-1 w-12 bg-primary/60 rounded"></div>
                </div>
              </div>
              <h3 id="destaques-title" className="sr-only">Destaques</h3>
              <DestaquesPage />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
