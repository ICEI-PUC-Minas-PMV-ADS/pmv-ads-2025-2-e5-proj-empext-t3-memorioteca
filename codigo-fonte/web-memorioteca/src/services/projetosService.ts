import { config } from '@/config/env'
import { ProjetosResponse, ProjetoResponse, ProjetoFormData, ProjetosFilters } from '@/types'

const API_BASE_URL = config.API_BASE_URL

export class ProjetosService {
  static async listarProjetos(
    filtros: ProjetosFilters = {}
  ): Promise<ProjetosResponse> {
    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const queryString = queryParams.toString()
      const url = queryString 
        ? `${API_BASE_URL}/projetos?${queryString}` 
        : `${API_BASE_URL}/projetos`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10
          },
          message: errorData.message || 'Erro ao carregar projetos'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de listar projetos:', error)
      return {
        success: false,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10
        },
        message: 'Erro de conexão com o servidor'
      }
    }
  }

  static async buscarProjetoPorId(id: string): Promise<ProjetoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Erro ao carregar projeto'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de buscar projeto:', error)
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      }
    }
  }

  static async criarProjeto(dadosProjeto: ProjetoFormData): Promise<ProjetoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosProjeto),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Erro ao criar projeto'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de criar projeto:', error)
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      }
    }
  }

  static async atualizarProjeto(
    id: string, 
    dadosProjeto: ProjetoFormData
  ): Promise<ProjetoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosProjeto),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Erro ao atualizar projeto'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de atualizar projeto:', error)
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      }
    }
  }

  static async deletarProjeto(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/projetos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Erro ao deletar projeto'
        }
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição de deletar projeto:', error)
      return {
        success: false,
        message: 'Erro de conexão com o servidor'
      }
    }
  }
}

export default ProjetosService