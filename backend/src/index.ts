import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; 

import { Todo } from '../src/interfaces/Todo';
const todos: Todo[] = [
  {
    id: uuidv4(),
    description: 'Complete project documentation',
    isCompleted: false,
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    description: 'Review code changes with team',
    isCompleted: true,
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    description: 'Set up CI/CD pipeline',
    isCompleted: false,
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    description: 'Write unit tests for API endpoints',
    isCompleted: false,
    createdAt: new Date()
  }
]



const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the Silverfort Mock Backend!');
});

app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});