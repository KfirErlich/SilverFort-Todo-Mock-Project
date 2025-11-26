
import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
    description: string;
    isCompleted: boolean;
    createdAt: Date;
}

const TodoSchema: Schema = new Schema({
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true 
    }
});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;