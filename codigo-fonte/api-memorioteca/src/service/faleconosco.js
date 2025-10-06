import { supabase } from '../infra/database.js'

export class MensagemFaleConosco {
  constructor(data = {}) {
    this.id = data?.id || null
    this.nome = data?.nome || ''
    this.email = data?.email || ''
    this.mensagem = data?.mensagem || ''
    this.data_envio = data?.data_envio || new Date().toISOString()
  }

  validate() {
    const errors = []

    if (!this.nome || this.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres.')
    }

    if (!this.email || !this.email.includes('@')) {
      errors.push('E-mail inválido.')
    }

    if (!this.mensagem || this.mensagem.trim().length < 10) {
      errors.push('Mensagem deve ter pelo menos 10 caracteres.')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  toDatabase() {
    return {
      nome: this.nome.trim(),
      email: this.email.trim(),
      mensagem: this.mensagem.trim(),
      data_envio: this.data_envio
    }
  }

  toPublic() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      mensagem: this.mensagem,
      data_envio: this.data_envio
    }
  }

  static async listarTodas() {
    const { data, error } = await supabase
      .from('fale_conosco')
      .select('*')
      .order('data_envio', { ascending: false })

    if (error) {
      console.error('Erro ao listar mensagens:', error)
      return { success: false, mensagens: [], error: error.message }
    }

    const mensagens = data.map(item => new MensagemFaleConosco(item).toPublic())
    return { success: true, mensagens }
  }

  static async salvarNova(data) {
    const mensagem = new MensagemFaleConosco(data)
    const validation = mensagem.validate()

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        mensagem: null
      }
    }

    const dbData = mensagem.toDatabase()

    const { data: savedData, error } = await supabase
      .from('fale_conosco')
      .insert([dbData])
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao salvar mensagem:', error)
      return {
        success: false,
        errors: ['Erro interno do servidor'],
        mensagem: null
      }
    }

    return {
      success: true,
      errors: [],
      mensagem: new MensagemFaleConosco(savedData).toPublic()
    }
  }
}