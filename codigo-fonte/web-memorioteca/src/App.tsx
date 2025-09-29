import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './globals.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/LoadingContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import DestaquesPage from './pages/DestaquesPage' 
import Footer from './components/Footer'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />
}

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen flex flex-col">
    <main className="flex-1 flex items-center justify-center">
      {children}
    </main>
    <Footer />
  </div>
)

const RedirectRoot = () => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
}

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <Routes>
            
            <Route path="/" element={<RedirectRoot />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <RegisterPage />
                  </PublicLayout>
                </PublicRoute>
              }
            />

            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

        
            <Route
              path="/destaques"
              element={
                <ProtectedRoute>
                  <DestaquesPage />
                </ProtectedRoute>
              }
            />

            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default App
