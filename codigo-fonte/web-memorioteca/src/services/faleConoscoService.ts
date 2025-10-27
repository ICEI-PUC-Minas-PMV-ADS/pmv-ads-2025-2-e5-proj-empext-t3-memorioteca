import axios from 'axios'
import { config } from '@/config/env'

const API_BASE_URL = config.API_BASE_URL

export interface MensagemPayload {
  nome: string
  email: string
  mensagem: string
}

export interface MensagemResposta {
  id: string
  nome: string
  email: string
  mensagem: string
  data_envio: string
}

export interface EnviarMensagemResult {
  success: boolean
  mensagem?: MensagemResposta
  errors?: string[]
}

export async function enviarMensagem(payload: MensagemPayload): Promise<EnviarMensagemResult> {
  try {
    const response = await axios.post<MensagemResposta>(`${API_BASE_URL}/fale-conosco`, payload)
    return {
      success: true,
      mensagem: response.data
    }
  } catch (error: any) {
    if (error.response?.data?.errors) {
      return {
        success: false,
        errors: error.response.data.errors
      }
    }
    return {
      success: false,
      errors: ['Erro ao enviar mensagem.']
    }
  }
}