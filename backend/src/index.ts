import express, { Request, Response } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello from the Silverfort Mock Backend!`);
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});