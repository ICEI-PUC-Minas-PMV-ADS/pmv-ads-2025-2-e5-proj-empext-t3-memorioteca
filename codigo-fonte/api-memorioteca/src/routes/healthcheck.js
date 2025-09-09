import express from 'express';
import { supabase } from '../infra/database.js';

const router = express.Router();

// Endpoint de healthcheck básico
router.get('/health', async (req, res) => {
  try {
    // Testa a conexão fazendo uma query simples
    const { data, error } = await supabase
      .from('_health_check')
      .select('*')
      .limit(1);

    // Se o erro for apenas "tabela não encontrada", a conexão está OK
    if (error && error.code !== 'PGRST205') {
      throw error;
    }

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        supabase_url: process.env.SUPABASE_URL ? 'configured' : 'missing'
      }
    });

  } catch (error) {
    console.error('Healthcheck failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'disconnected',
        error: error.message
      }
    });
  }
});

export default router;