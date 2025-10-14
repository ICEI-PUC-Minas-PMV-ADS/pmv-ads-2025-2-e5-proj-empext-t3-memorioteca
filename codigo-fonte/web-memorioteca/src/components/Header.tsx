import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui'

const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-primary border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1
            className="text-3xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Memorioteca
          </h1>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => navigate('/institucional')}
              className="text-base font-normal text-white hover:text-gray-200 transition-colors uppercase"
            >
              Sobre
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="text-base font-normal text-white hover:text-gray-200 transition-colors uppercase"
            >
              Projetos
            </button>
            <button
              onClick={() => navigate('/fale-conosco')}
              className="text-base font-normal text-white hover:text-gray-200 transition-colors uppercase"
            >
              Entrar em Contato
            </button>

            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-base font-normal text-white hover:text-gray-200 transition-colors uppercase"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <span>Usuário</span>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {user?.user_type === 'ADMINISTRADOR' && (
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false)
                          navigate('/admin/usuarios')
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 uppercase"
                      >
                        Listar usuários
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false)
                        navigate('/dashboard')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 uppercase"
                    >
                      Dados da Conta
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false)
                        navigate('/change-password')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 uppercase"
                    >
                      Alterar Senha
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false)
                        navigate('/dashboard')
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 uppercase"
                    >
                      Deletar Conta
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sair Button */}
            <Button
              onClick={handleLogout}
              className="bg-black text-white hover:bg-gray-800 px-8 py-2 rounded-md uppercase font-normal"
            >
              Sair
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header