import express from 'express';
import healthcheckRoutes from './routes/healthcheck.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api', healthcheckRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});