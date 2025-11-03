import { supabase } from '../infra/database.js';

export class Project {
  constructor(data = {}) {
    this.id = data.id || null;
    this.titulo = data.titulo || '';
    this.descricao = data.descricao || '';
    this.url = data.url || null;
    this.data_criacao = data.data_criacao || new Date().toISOString();
    this.data_atualizacao = data.data_atualizacao || null;
    this.nome_autor = data.nome_autor || null;
    this.data_inicio = data.data_inicio || null;
    this.data_fim = data.data_fim || null;
    this.url_drive = data.url_drive || '';
    this.drive_publico = data.drive_publico || false;
  }

  validate() {
    const errors = [];
    if (!this.titulo || this.titulo.trim() === '') errors.push('Título é obrigatório.');
    if (!this.descricao || this.descricao.trim() === '') errors.push('Descrição é obrigatória.');
    return { isValid: errors.length === 0, errors };
  }

  toDatabase(update = false) {
    const now = new Date().toISOString();
    const dbObj = {
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      url: this.url,
      data_criacao: this.data_criacao,
      nome_autor: this.nome_autor,
      data_inicio: this.data_inicio,
      data_fim: this.data_fim,
      url_drive: this.url_drive,
      drive_publico: this.drive_publico
    };
    if (update) dbObj.data_atualizacao = now;
    return dbObj;
  }

  toPublic() {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      url: this.url,
      data_criacao: this.data_criacao,
      data_atualizacao: this.data_atualizacao,
      nome_autor: this.nome_autor,
      data_inicio: this.data_inicio,
      data_fim: this.data_fim,
      url_drive: this.url_drive,
      drive_publico: this.drive_publico
    };
  }

  static async criarNovo(data) {
    try {      
      const project = new Project(data);
      
      const validation = project.validate();
      if (!validation.isValid) {
        return { success: false, errors: validation.errors, project: null };
      }

      const dbData = project.toDatabase();
      const { data: created, error } = await supabase
        .from('projetos')
        .insert([dbData])
        .select('*')
        .single();

      if (error) {
        console.error('Erro ao criar projeto:', error);
        return { success: false, errors: ['Erro interno do servidor'], project: null };
      }

      return { success: true, errors: [], project: new Project(created).toPublic() };
    } catch (err) {
      console.error('Erro inesperado ao criar projeto:', err);
      return { success: false, errors: ['Erro interno do servidor'], project: null };
    }
  }

  static async listarTodos(options = {}) {
    try {
      const { page = 1, limit = 10, search = '' } = options;
      const offset = (page - 1) * limit;

      let query = supabase.from('projetos').select('*', { count: 'exact' });

      if (search) {
        query = query.or(`titulo.ilike.%${search}%,descricao.ilike.%${search}%`);
      }

      query = query.order('data_criacao', { ascending: false }).range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Erro ao listar projetos:', error);
        return { success: false, projects: [], pagination: null };
      }

      return {
        success: true,
        projects: data.map(p => new Project(p).toPublic()),
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (err) {
      console.error('Erro inesperado ao listar projetos:', err);
      return { success: false, projects: [], pagination: null };
    }
  }

  static async editar(id, data) {
    try {
      const project = new Project(data);
      const validation = project.validate();
      if (!validation.isValid) {
        return { success: false, errors: validation.errors, project: null };
      }

      const dbData = project.toDatabase(true);
      const { data: updated, error } = await supabase
        .from('projetos')
        .update(dbData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Erro ao editar projeto:', error);
        return { success: false, errors: ['Erro interno do servidor'], project: null };
      }

      return { success: true, errors: [], project: new Project(updated).toPublic() };
    } catch (err) {
      console.error('Erro inesperado ao editar projeto:', err);
      return { success: false, errors: ['Erro interno do servidor'], project: null };
    }
  }

  static async deletar(id) {
    try {
      const { error } = await supabase.from('projetos').delete().eq('id', id);

      if (error) {
        console.error('Erro ao deletar projeto:', error);
        return { success: false, errors: ['Erro interno do servidor'] };
      }

      return { success: true, errors: [] };
    } catch (err) {
      console.error('Erro inesperado ao deletar projeto:', err);
      return { success: false, errors: ['Erro interno do servidor'] };
    }
  }

  static async recuperar(id) {
    try {
      
      const { data: updated, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if(error.code == "PGRST116") return { success: false, errors: ['Não foi encontrado nenhum projeto com o id informado.'], project: null, code: 404 };
        if(error.code == "22P02") return { success: false, errors: ['O id informado é invalido.'], project: null, code: 400 };
        console.error('Erro ao recuperar o projeto:', error);
        return { success: false, errors: ['Erro interno do servidor'], project: null, code: 500 };
      }        

      var atual = new Project(updated).toPublic();

      return { success: true, errors: [], project: atual };
    } catch (err) {
      console.error('Erro ao recuperar o projeto:', err);
      return { success: false, errors: ['Erro interno do servidor'], project: null };
    }
  }

  static async listarProjetos(filtros = {}) {
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
}
