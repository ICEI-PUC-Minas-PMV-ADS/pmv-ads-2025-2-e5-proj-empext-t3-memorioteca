import express from 'express';
import {User} from '../service/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let result = await User.authenticate(req.body.email, req.body.senha);

    if(result.success)
        res.status(200).json(result);
    else
        res.status(401).json(result);

  } catch (error) {
    console.error('Auth failed:', error);
    
    res.status(500).json({
        status:500,
        message:error.message
    });
  }
});

export default router;