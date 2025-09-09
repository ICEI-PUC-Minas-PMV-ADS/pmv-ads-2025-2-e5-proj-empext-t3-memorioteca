import bcrypt from 'bcrypt';
import { supabase } from '../infra/database.js';

export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.email = data.email || '';
    this.nome = data.nome || '';
    this.senha = data.senha || '';
    this.data_criacao = data.data_criacao || new Date().toISOString();
    this.ultimo_login = data.ultimo_login || null;
  }

  validate() {
    const errors = [];

    if (!this.email) {
      errors.push('Email é obrigatório');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Email deve ter um formato válido');
    }

    if (!this.nome) {
      errors.push('Nome é obrigatório');
    } else if (this.nome.length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    } else if (this.nome.length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres');
    }

    if (!this.id && !this.senha) {
      errors.push('Senha é obrigatória');
    } else if (!this.id && this.senha.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async hashPassword(plainPassword) {
    const saltRounds = 12;
    return await bcrypt.hash(plainPassword, saltRounds);
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async toDatabase() {
    const data = {
      email: this.email.toLowerCase().trim(),
      nome: this.nome.trim(),
      data_criacao: this.data_criacao,
      ultimo_login: this.ultimo_login
    };

    if (this.senha) {
      data.senha_hash = await this.hashPassword(this.senha);
    }

    return data;
  }

  toPublic() {
    return {
      id: this.id,
      email: this.email,
      nome: this.nome,
      data_criacao: this.data_criacao,
      ultimo_login: this.ultimo_login
    };
  }

  static async criarNovo(userData) {
    try {
      const user = new User(userData);
      
      const validation = user.validate();
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
          user: null
        };
      }

      const existingUser = await this.findByEmail(user.email);
      if (existingUser.success && existingUser.user) {
        return {
          success: false,
          errors: ['Email já está em uso'],
          user: null
        };
      }

      const dbData = await user.toDatabase();
      
      const { data, error } = await supabase
        .from('users')
        .insert([dbData])
        .select('*')
        .single();

      if (error) {
        console.error('Erro ao criar usuário:', error);
        return {
          success: false,
          errors: ['Erro interno do servidor'],
          user: null
        };
      }

      const createdUser = new User(data);
      return {
        success: true,
        errors: [],
        user: createdUser.toPublic()
      };

    } catch (error) {
      console.error('Erro inesperado ao criar usuário:', error);
      return {
        success: false,
        errors: ['Erro interno do servidor'],
        user: null
      };
    }
  }

  static async buscarPorId(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return { success: true, user: null };
        }
        console.error('Erro ao buscar usuário por ID:', error);
        return { success: false, user: null, error: error.message };
      }

      const user = new User(data);
      return { success: true, user: user.toPublic() };

    } catch (error) {
      console.error('Erro inesperado ao buscar usuário:', error);
      return { success: false, user: null, error: error.message };
    }
  }

  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return { success: true, user: null };
        }
        console.error('Erro ao buscar usuário por email:', error);
        return { success: false, user: null, error: error.message };
      }

      const user = new User(data);
      return { success: true, user };

    } catch (error) {
      console.error('Erro inesperado ao buscar usuário:', error);
      return { success: false, user: null, error: error.message };
    }
  }

  static async authenticate(email, password) {
    try {
        
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (error || !data) {
        return {
          success: false,
          message: 'Email ou senha incorretos',
          user: null
        };
      }

      const user = new User(data);
      
      const isPasswordValid = await user.verifyPassword(password, data.senha_hash);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Email ou senha incorretos',
          user: null
        };
      }

      await user.updateLastLogin();

      return {
        success: true,
        message: 'Login realizado com sucesso',
        user: user.toPublic()
      };

    } catch (error) {
      console.error('Erro na autenticação:', error);
      return {
        success: false,
        message: 'Erro interno do servidor',
        user: null
      };
    }
  }

  async updateLastLogin() {
    try {
      const now = new Date().toISOString();
      
      const { error } = await supabase
        .from('users')
        .update({ ultimo_login: now })
        .eq('id', this.id);

      if (!error) {
        this.ultimo_login = now;
      }

      return !error;
    } catch (error) {
      console.error('Erro ao atualizar último login:', error);
      return false;
    }
  }

  async update(updateData) {
    try {
        
      const allowedFields = ['nome'];
      const updates = {};
      
      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          this[field] = updateData[field];
          updates[field] = updateData[field];
        }
      }
      
      const validation = this.validate();
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', this.id)
        .select('*')
        .single();

      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        return {
          success: false,
          errors: ['Erro interno do servidor']
        };
      }

      Object.assign(this, data);

      return {
        success: true,
        user: this.toPublic()
      };

    } catch (error) {
      console.error('Erro inesperado ao atualizar usuário:', error);
      return {
        success: false,
        errors: ['Erro interno do servidor']
      };
    }
  }

  static async listarTodos(options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search = ''
      } = options;

      const offset = (page - 1) * limit;

      let query = supabase
        .from('users')
        .select('id, email, nome, data_criacao, ultimo_login', { count: 'exact' });

      if (search) {
        query = query.or(`nome.ilike.%${search}%,email.ilike.%${search}%`);
      }

      query = query
        .order('data_criacao', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Erro ao listar usuários:', error);
        return {
          success: false,
          users: [],
          pagination: null
        };
      }

      return {
        success: true,
        users: data,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };

    } catch (error) {
      console.error('Erro inesperado ao listar usuários:', error);
      return {
        success: false,
        users: [],
        pagination: null
      };
    }
  }
}