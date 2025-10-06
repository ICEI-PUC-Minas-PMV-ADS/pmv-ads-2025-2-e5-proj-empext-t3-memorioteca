import { config } from '@/config/env'

export interface ProjectData {
  id?: number
  titulo: string
  descricao: string
  url?: string | null
  data_criacao?: string
  data_atualizacao?: string
}

export interface ProjectResponse {
  success: boolean
  projetos?: ProjectData[]
  projeto?: ProjectData
  errors?: string[]
}

const API_BASE_URL = config.API_BASE_URL

export class ProjectService {
  // Buscar todos os projetos
  static async getProjects(token: string): Promise<ProjectResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/projetos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data: ProjectResponse = await res.json()
      return {
        success: data.success,
        projetos: data.projetos || [],
        errors: data.errors || [],
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
      return { success: false, projetos: [], errors: ['Erro de conexão com o servidor'] }
    }
  }

  // Criar novo projeto
  static async createProject(project: ProjectData, token: string): Promise<ProjectResponse> {
    try {
      const payload = { ...project, url: project.url?.trim() || null }

      const res = await fetch(`${API_BASE_URL}/projetos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data: ProjectResponse = await res.json()
      return {
        success: data.success,
        projeto: data.projeto,
        errors: data.errors || [],
      }
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      return { success: false, projeto: undefined, errors: ['Erro de conexão com o servidor'] }
    }
  }

  // Atualizar projeto
  static async updateProject(id: number, project: ProjectData, token: string): Promise<ProjectResponse> {
    try {
      const payload = { ...project, url: project.url?.trim() || null }

      const res = await fetch(`${API_BASE_URL}/projetos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data: ProjectResponse = await res.json()
      return {
        success: data.success,
        projeto: data.projeto,
        errors: data.errors || [],
      }
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
      return { success: false, projeto: undefined, errors: ['Erro de conexão com o servidor'] }
    }
  }

  // Deletar projeto
  static async deleteProject(id: number, token: string): Promise<ProjectResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/projetos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const data: ProjectResponse = await res.json()
      return {
        success: data.success,
        errors: data.errors || [],
      }
    } catch (error) {
      console.error('Erro ao deletar projeto:', error)
      return { success: false, errors: ['Erro de conexão com o servidor'] }
    }
  }
}
