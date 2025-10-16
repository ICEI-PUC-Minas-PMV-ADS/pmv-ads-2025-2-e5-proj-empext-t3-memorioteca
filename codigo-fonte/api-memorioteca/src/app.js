import express from 'express';
import dotenv from 'dotenv';

import healthcheckRoutes from './routes/healthcheck.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import institucionalRoutes from './routes/institucional.js';
import faleConoscoRouter from './routes/faleconosco.js';
import projectRoutes from './routes/project.js';
import projetosRoutes from './routes/projetos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Rotas
app.use('/health', healthcheckRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/institucional', institucionalRoutes);
app.use('/projetos', projetosRoutes);;
app.use('/fale-conosco', faleConoscoRouter);
app.use('/projetos', projectRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
