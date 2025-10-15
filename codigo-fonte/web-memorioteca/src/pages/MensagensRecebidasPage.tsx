import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { MensagemResposta } from '@/services/faleConoscoService'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default function MensagensRecebidasPage() {
  const [mensagens, setMensagens] = useState<MensagemResposta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMensagens() {
      try {
        const response = await axios.get<MensagemResposta[]>('/api/fale-conosco')
        setMensagens(response.data)
      } catch (err) {
        setError('Erro ao carregar mensagens.')
      } finally {
        setLoading(false)
      }
    }

    fetchMensagens()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
      <CardHeader>
        <CardTitle>Mensagens Recebidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && <p>Carregando mensagens...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {mensagens.length === 0 && !loading && <p>Nenhuma mensagem recebida ainda.</p>}

        {mensagens.map((msg) => (
          <div key={msg.id} className="border p-4 rounded-md space-y-1">
            <div className="flex justify-between items-center">
              <strong>{msg.nome}</strong>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {dayjs.utc(msg.data_envio).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}
              </span>
            </div>
            <p className="text-sm text-gray-600">{msg.email}</p>
            <p>{msg.mensagem}</p>
          </div>
        ))}
      </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}