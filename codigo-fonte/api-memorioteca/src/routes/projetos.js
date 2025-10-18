import express from 'express';
import projetosService from '../service/projetos.js';

const router = express.Router();



router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projeto = await projetosService.buscarProjetoPorId(id);
    
    if (!projeto) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      data: projeto
    });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, url } = req.body;
    
    if (!titulo || !descricao) {
      return res.status(400).json({
        success: false,
        message: 'Título e descrição são obrigatórios'
      });
    }

    const novoProjeto = await projetosService.criarProjeto({
      titulo,
      descricao,
      url
    });

    res.status(201).json({
      success: true,
      data: novoProjeto,
      message: 'Projeto criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, url } = req.body;
    
    const projetoAtualizado = await projetosService.atualizarProjeto(id, {
      titulo,
      descricao,
      url
    });

    if (!projetoAtualizado) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      data: projetoAtualizado,
      message: 'Projeto atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletado = await projetosService.deletarProjeto(id);

    if (!deletado) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;