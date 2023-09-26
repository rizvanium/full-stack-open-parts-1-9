import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});