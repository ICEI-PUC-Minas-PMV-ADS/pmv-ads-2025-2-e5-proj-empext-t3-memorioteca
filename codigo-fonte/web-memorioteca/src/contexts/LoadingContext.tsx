import React, { createContext, useContext, useState, useMemo } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  loadingMessage?: string
  setLoadingMessage: (message?: string) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>()

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (!loading) {
      setLoadingMessage(undefined)
    }
  }

  const value: LoadingContextType = useMemo(() => ({
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage
  }), [isLoading, loadingMessage])

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}