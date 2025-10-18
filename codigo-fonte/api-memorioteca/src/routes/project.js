import express from 'express';
import { Project } from '../service/project.js';
import authenticate from '../middleware/auth.js';
import { listRecentProjects } from '../service/destaquesprojects.js'

const router = express.Router();

router.get('/featured', async (req, res) => {
  const limit = Number(req.query.limit ?? 3)
  const { data, error } = await listRecentProjects(limit)

  if (error) {
    return res.status(500).json({
      message: 'Erro ao buscar destaques',
      details: error.message ?? error
    })
  }
  return res.json(data ?? [])
});

// GET - listar todos os projetos
// router.get('/', authenticate, async (req, res) => {
//   try {
//     let options = {
//       page: req.query.page ? parseInt(req.query.page) : 1,
//       limit: req.query.limit ? parseInt(req.query.limit) : 10,
//       search: req.query.search || ''
//     };

//     let result = await Project.listarTodos(options);

//     res.status(200).json(result);

//   } catch (error) {
//     console.error('Project failed:', error);
//     res.status(500).json({
//       success: false,
//       errors: ['Erro interno do servidor'],
//       projects: []
//     });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const { titulo, descricao, data_criacao, page = 1, limit = 10 } = req.query;
    
    const filtros = {
      titulo,
      descricao,
      data_criacao,
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const resultado = await Project.listarProjetos(filtros);
    
    res.json({
      success: true,
      data: resultado.projetos,
      pagination: {
        currentPage: filtros.page,
        totalPages: resultado.totalPages,
        totalItems: resultado.totalItems,
        itemsPerPage: filtros.limit
      }
    });
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
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
