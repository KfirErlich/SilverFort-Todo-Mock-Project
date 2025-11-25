import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../interfaces/Todo';

// In-memory storage for todos
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
];

export const getTodos = (req: Request, res: Response) => {
  console.log('Current todos:', JSON.stringify(todos, null, 2));
  res.json(todos);
};

export const addTodo = (req: Request, res: Response) => {
  const { description, isCompleted = false } = req.body;
  
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const newTodo: Todo = {
    id: uuidv4(),
    description,
    isCompleted,
    createdAt: new Date()
  };

  todos.push(newTodo);
  console.log('Added new todo:', JSON.stringify(newTodo, null, 2));
  res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.isCompleted = isCompleted;
  console.log('Updated todo:', JSON.stringify(todo, null, 2));
  res.json(todo);
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1)[0];
  console.log('Deleted todo:', JSON.stringify(deletedTodo, null, 2));
  res.status(204).send();
};
