import type { TodoTaskProps } from "../interfaces/Todo";


function TodoTask({ todo, handleTaskCompletion }: TodoTaskProps) {
    const taskCompleted = todo.isCompleted ? 'bg-green-200' : 'bg-red-200';
  return (
    <div className={`flex gap-2 items-center justify-between ${taskCompleted}
     border border-gray-300 rounded-lg shadow-md p-4 w-full max-w-md`
     }>
      <h1 className="text-2xl font-bold">{todo.description}</h1>
      <input type="checkbox" className="w-5 h-5" checked={todo.isCompleted} onChange={() => handleTaskCompletion(todo.id)} />

    </div>
  )
}
export default TodoTask;
