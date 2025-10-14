import express from 'express';
import {User} from '../service/user.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    let result = await User.listarTodos();

    res.status(200).json(result);

  } catch (error) {
    console.error('User failed:', error);
    
    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    let result = await User.criarNovo(req.body);

    if(result.success)
      res.status(201).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('User failed:', error);

    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await User.buscarPorId(id);

    if (result.success && result.user) {
      res.status(200).json(result);
    } else if (result.success && !result.user) {
      res.status(404).json({
        success: false,
        errors: ['Usuário não encontrado']
      });
    } else {
      res.status(500).json(result);
    }

  } catch (error) {
    console.error('User failed:', error);

    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await User.atualizarUsuario(id, req.body);

    if(result.success)
      res.status(200).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('User failed:', error);

    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

router.put('/:id/senha', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({
        success: false,
        errors: ['Senha atual e nova senha são obrigatórias']
      });
    }

    let result = await User.alterarSenha(id, senhaAtual, novaSenha);

    if(result.success)
      res.status(200).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('User failed:', error);

    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await User.excluirUsuario(id);

    if(result.success)
      res.status(200).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('User failed:', error);

    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

export default router;