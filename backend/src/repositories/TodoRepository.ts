
import TodoModel, { ITodo } from '../models/Todo'; 
import mongoose from 'mongoose';

export class TodoRepository {

    private transformTodo(todo: ITodo | null): any {
        if (!todo) return null;
        const todoObj = (todo as any).toObject ? (todo as any).toObject() : todo;
        return {
            id: todoObj._id?.toString() || todoObj.id,
            description: todoObj.description,
            isCompleted: todoObj.isCompleted,
            createdAt: todoObj.createdAt
        };
    }

    public async findAll(): Promise<any[]> {
        const todos = await TodoModel.find().sort({ createdAt: -1 });
        return todos.map(todo => this.transformTodo(todo));
    }

    public async create(description: string): Promise<any> {
        const newTodo = new TodoModel({ 
            description
        });
        const savedTodo = await newTodo.save();
        return this.transformTodo(savedTodo);
    }


    public async updateCompletion(id: string, isCompleted: boolean): Promise<any | null> {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid todo ID format');
        }

        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            { isCompleted },
            { new: true } 
        ).exec();

        if (!updatedTodo) {
            return null;
        }

        return this.transformTodo(updatedTodo);
    }

    public async delete(id: string): Promise<any | null> {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid todo ID format');
        }

        const deletedTodo = await TodoModel.findByIdAndDelete(id).exec();
        if (!deletedTodo) {
            return null;
        }
        return this.transformTodo(deletedTodo);
    }
}