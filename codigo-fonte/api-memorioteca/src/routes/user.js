import express from 'express';
import {User} from '../service/user.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/user', authenticate, async (req, res) => {
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

router.post('/user', async (req, res) => {
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

export default router;