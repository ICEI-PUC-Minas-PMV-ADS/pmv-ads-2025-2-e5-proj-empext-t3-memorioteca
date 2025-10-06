import express from 'express';
import { Project } from '../service/project.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET - listar todos os projetos
router.get('/', authenticate, async (req, res) => {
  try {
    let options = {
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
      search: req.query.search || ''
    };

    let result = await Project.listarTodos(options);

    res.status(200).json(result);

  } catch (error) {
    console.error('Project failed:', error);
    res.status(500).json({
      success: false,
      errors: ['Erro interno do servidor'],
      projects: []
    });
  }
});

// POST - criar novo projeto
router.post('/', authenticate, async (req, res) => {
  try {
    let result = await Project.criarNovo(req.body);

    if (result.success)
      res.status(201).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('Project failed:', error);
    res.status(500).json({
      success: false,
      errors: ['Erro interno do servidor'],
      project: null
    });
  }
});

// PUT - editar projeto
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Project.editar(id, req.body);

    if (result.success)
      res.status(200).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('Project failed:', error);
    res.status(500).json({
      success: false,
      errors: ['Erro interno do servidor'],
      project: null
    });
  }
});

// DELETE - remover projeto
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Project.deletar(id);

    if (result.success)
      res.status(200).json(result);
    else
      res.status(400).json(result);

  } catch (error) {
    console.error('Project failed:', error);
    res.status(500).json({
      success: false,
      errors: ['Erro interno do servidor']
    });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Project.recuperar(id);

    if (result.success)
      res.status(200).json(result);
    else
      res.status(result.code).json(result);
    
  } catch (error) {
    console.error('Project failed:', error);
    res.status(500).json({
      success: false,
      errors: ['Erro interno do servidor']
    });
  }
});

export default router;
