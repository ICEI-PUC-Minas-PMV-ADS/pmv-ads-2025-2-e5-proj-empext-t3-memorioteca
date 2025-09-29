import { Router } from 'express'
import { listRecentProjects } from '../service/destaquesprojects.js'

const router = Router()

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
})

export default router
