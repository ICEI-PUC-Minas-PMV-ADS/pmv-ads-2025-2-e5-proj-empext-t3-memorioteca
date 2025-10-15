import { supabase } from '../infra/database.js';

class ProjetosService {
  async listarProjetos(filtros = {}) {
    const { titulo, descricao, page = 1, limit = 10 } = filtros;
    
    try {
      let query = supabase
        .from('projetos')
        .select(`
          id,
          titulo,
          descricao,
          url,
          data_criacao
        `)
        .order('data_criacao', { ascending: false });

      // Aplicar filtros
      if (titulo) {
        query = query.ilike('titulo', `%${titulo}%`);
      }

      if (descricao) {
        query = query.ilike('descricao', `%${descricao}%`);
      }

    if (filtros.data_criacao) {
      const dataInicio = `${filtros.data_criacao}T00:00:00.000Z`;
      const dataFim = `${filtros.data_criacao}T23:59:59.999Z`;
      
      query = query.gte('data_criacao', dataInicio);
      query = query.lte('data_criacao', dataFim);
    }

      const { count } = await supabase
        .from('projetos')
        .select('*', { count: 'exact', head: true });

      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);

      const { data: projetos, error } = await query;

      if (error) {
        console.error('Erro ao listar projetos:', error);
        throw error;
      }

      const totalItems = count || 0;
      const totalPages = Math.ceil(totalItems / limit);

      return {
        projetos: projetos || [],
        totalItems,
        totalPages
      };
    } catch (error) {
      console.error('Erro ao listar projetos:', error);
      throw error;
    }
  }

  async buscarProjetoPorId(id) {
    try {
      const { data: projeto, error } = await supabase
        .from('projetos')
        .select(`
          id,
          titulo,
          descricao,
          url,
          data_criacao
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar projeto por ID:', error);
        return null;
      }

      return projeto;
    } catch (error) {
      console.error('Erro ao buscar projeto por ID:', error);
      throw error;
    }
  }

  async criarProjeto(dadosProjeto) {
    const { titulo, descricao, url } = dadosProjeto;
    
    try {
      const { data: projeto, error } = await supabase
        .from('projetos')
        .insert({
          titulo,
          descricao,
          url,
          data_criacao: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar projeto:', error);
        throw error;
      }

      return projeto;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  }

  async atualizarProjeto(id, dadosProjeto) {
    const { titulo, descricao, url } = dadosProjeto;
    
    try {
      const { data: projeto, error } = await supabase
        .from('projetos')
        .update({
          titulo,
          descricao,
          url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar projeto:', error);
        return null;
      }

      return projeto;
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw error;
    }
  }

  async deletarProjeto(id) {
    try {
      const { error } = await supabase
        .from('projetos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar projeto:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      throw error;
    }
  }
}

export default new ProjetosService();