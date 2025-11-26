import { useState, type FormEvent } from "react";
import type { AddTodoProps } from "../interfaces/Todo";
import { addTodo } from "../services/todoApi";

export default function AddTodo({handleAddTodo}: AddTodoProps) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    const result = await addTodo(description.trim(), false);
    setIsLoading(false);

    if (result.success) {
      handleAddTodo(result.data);
      setDescription("");
    } else {
      console.error('Failed to add todo:', result.error);
      // You could add user-facing error handling here (toast, alert, etc.)
    }
  };

  return (
    <form
      className="flex gap-2 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new todo"
        className="border border-gray-300 rounded-lg shadow-md p-2 flex-1 text-center"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}