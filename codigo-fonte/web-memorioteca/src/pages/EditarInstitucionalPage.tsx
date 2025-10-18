import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInstitucional, updateInstitucional } from '@/services/institucionalService'
import { supabase } from '@/infra/supabaseClient'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui'
import Textarea from '@/components/ui/Textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

export default function EditarInstitucionalPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [texto, setTexto] = useState<string>('')
  const [imagemUrl, setImagemUrl] = useState<string>('')
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    // Proteção de acesso: redireciona se não for ADMINISTRADOR
    if (!user || user.user_type !== 'ADMINISTRADOR') {
      navigate('/')
      return
    }

    async function carregarDados() {
      setCarregando(true)
      const dados = await getInstitucional()
      if (dados) {
        setTexto(dados.texto || '')
        setImagemUrl(dados.imagem_url || '')
      } else {
        setErro('Erro ao carregar dados institucionais.')
      }
      setCarregando(false)
    }

    carregarDados()
  }, [user, navigate])

  const handleImagemUpload = async (file: File): Promise<string | null> => {
    try {
      setUploading(true)
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `public/${fileName}`

      const { error } = await supabase.storage
        .from('Institucional')
        .upload(filePath, file, { upsert: true })

      if (error) {
        console.error('Erro ao fazer upload:', error)
        alert('Erro ao fazer upload da imagem.')
        return null
      }

      const { data: publicUrlData } = supabase.storage
        .from('Institucional')
        .getPublicUrl(filePath)

      return publicUrlData.publicUrl
    } finally {
      setUploading(false)
    }
  }

  const handleSalvar = async () => {
    if (!texto || texto.trim().length < 10) {
      alert('O texto institucional deve ter pelo menos 10 caracteres.')
      return
    }

    if (!imagemUrl) {
      alert('É necessário enviar uma imagem.')
      return
    }

    const sucesso = await updateInstitucional({ texto, imagemUrl })
    if (sucesso) {
      alert('Conteúdo atualizado com sucesso!')
      navigate('/institucional')
    } else {
      alert('Erro ao atualizar o conteúdo.')
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {carregando ? (
            <p className="text-center text-muted-foreground">Carregando conteúdo institucional...</p>
          ) : erro ? (
            <p className="text-center text-red-500">{erro}</p>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Editar Página Institucional</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Campo de texto */}
                <Textarea
                  label="Texto institucional"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Digite o texto institucional..."
                  rows={10}
                  required
                />

                {/* Campo de imagem */}
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Imagem institucional</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.target.files
                      if (!files || files.length === 0) return
                      const file = files[0]
                      const url = await handleImagemUpload(file)
                      if (url) setImagemUrl(url)
                    }}
                  />
                  {uploading && <p className="text-blue-500 text-sm">Fazendo upload da imagem...</p>}
                </div>

                {/* Pré-visualização */}
                {imagemUrl && (
                  <div className="flex justify-center">
                    <img
                      src={imagemUrl}
                      alt="Pré-visualização"
                      className="max-w-full max-h-64 rounded-md shadow-md"
                    />
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button onClick={handleSalvar}>Salvar alterações</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
``