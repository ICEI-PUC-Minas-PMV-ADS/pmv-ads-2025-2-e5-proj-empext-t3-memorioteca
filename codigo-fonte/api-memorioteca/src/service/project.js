import { supabase } from '../infra/database.js';

export class Project {
  constructor(data = {}) {
    this.id = data.id || null;
    this.titulo = data.titulo || '';
    this.descricao = data.descricao || '';
    this.url = data.url || null;
    this.data_criacao = data.data_criacao || new Date().toISOString();
    this.data_atualizacao = data.data_atualizacao || null;
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
    };
  }

  static async criarNovo(data) {
    try {
      console.log(data);
      const project = new Project(data);
      console.log(project);
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
}
