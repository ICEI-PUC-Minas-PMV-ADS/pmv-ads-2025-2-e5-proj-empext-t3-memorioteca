import express from 'express';
import { check } from '../service/healthcheck.js';

const router = express.Router();

// Endpoint de healthcheck básico
router.get('/', async (req, res) => {
  try {
    console.log('fdsfdsfsd')
    let result = await check();

    res.status(200).json(result);

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