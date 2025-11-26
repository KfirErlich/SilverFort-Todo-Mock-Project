
import { Request, Response } from 'express';
import { TodoRepository } from '../repositories/TodoRepository'; 

const todoRepository = new TodoRepository();

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await todoRepository.findAll();
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const addTodo = async (req: Request, res: Response) => {
    const { description } = req.body;
    
    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
    }

    try {
        const newTodo = await todoRepository.create(description);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'isCompleted must be a boolean' });
    }

    try {
        const updatedTodo = await todoRepository.updateCompletion(id, isCompleted);
      
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        // Handle invalid ID format
        if (errorMessage.includes('Invalid todo ID format')) {
            return res.status(400).json({ error: 'Invalid todo ID format' });
        }
        
        res.status(500).json({ error: 'Failed to update todo', details: errorMessage });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedTodo = await todoRepository.delete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};