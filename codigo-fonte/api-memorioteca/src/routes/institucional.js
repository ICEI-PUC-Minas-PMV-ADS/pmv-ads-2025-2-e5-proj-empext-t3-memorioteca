import express from 'express'
import { Institucional } from '../service/institucional.js'

const router = express.Router()

// Rota para visitantes visualizarem o conteúdo institucional
router.get('/', async (req, res) => {
  const { success, institucional, error } = await Institucional.buscarUltimaVersao()

  if (!success) {
    return res.status(500).json({ error })
  }

  return res.status(200).json(institucional)
})

// Rota para o administrador editar o conteúdo institucional
router.put('/', async (req, res) => {
  const { texto, imagem_url } = req.body

  const { success, errors, institucional } = await Institucional.salvarNovo({ texto, imagem_url })

  if (!success) {
    return res.status(400).json({ errors })
  }

  return res.status(200).json(institucional)
})

export default router