import { supabase } from '../infra/database.js'

export class Institucional {
  constructor(data = {}) {
    this.id = data?.id || null
    this.texto = data?.texto || ''
    this.imagem_url = data?.imagem_url || ''
    this.data_criacao = data?.data_criacao || new Date().toISOString()
  }

  validate() {
    const errors = []

    if (!this.texto || this.texto.trim().length < 10) {
      errors.push('Texto institucional deve ter pelo menos 10 caracteres.')
    }

    if (!this.imagem_url || !this.imagem_url.startsWith('http')) {
      errors.push('URL da imagem institucional é inválida.')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  toDatabase() {
    return {
      texto: this.texto.trim(),
      imagem_url: this.imagem_url.trim(),
      data_criacao: this.data_criacao
    }
  }

  toPublic() {
    return {
      id: this.id,
      texto: this.texto,
      imagem_url: this.imagem_url,
      data_criacao: this.data_criacao
    }
  }

  static async buscarUltimaVersao() {
    const { data, error } = await supabase
      .from('institucional')
      .select('*')
      .order('data_criacao', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Erro ao buscar institucional:', error)
      return { success: false, institucional: null, error: error.message }
    }

    if (!data) {
      return {
        success: true,
        institucional: null
      }
    }

    return { success: true, institucional: new Institucional(data).toPublic() }
  }

  static async salvarNovo(data) {
    const institucional = new Institucional(data)
    const validation = institucional.validate()

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        institucional: null
      }
    }

    const dbData = institucional.toDatabase()

    const { data: savedData, error } = await supabase
      .from('institucional')
      .insert([dbData])
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao salvar institucional:', error)
      return {
        success: false,
        errors: ['Erro interno do servidor'],
        institucional: null
      }
    }

    return {
      success: true,
      errors: [],
      institucional: new Institucional(savedData).toPublic()
    }
  }
}