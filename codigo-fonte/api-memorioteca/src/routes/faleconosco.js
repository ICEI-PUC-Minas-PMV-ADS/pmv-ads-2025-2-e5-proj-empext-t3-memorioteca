import express from 'express'
import { MensagemFaleConosco } from '../service/faleconosco.js'

const router = express.Router()

// Rota para visitantes enviarem uma nova mensagem
router.post('/', async (req, res) => {
  const { nome, email, mensagem } = req.body

  const { success, errors, mensagem: mensagemSalva } = await MensagemFaleConosco.salvarNova({ nome, email, mensagem })

  if (!success) {
    return res.status(400).json({ errors })
  }

  return res.status(201).json(mensagemSalva)
})

// Rota para listar todas as mensagens recebidas
router.get('/', async (req, res) => {
  const { success, mensagens, error } = await MensagemFaleConosco.listarTodas()

  if (!success) {
    return res.status(500).json({ error })
  }

  return res.status(200).json(mensagens)
})

export default router