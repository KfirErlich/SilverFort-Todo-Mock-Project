import type { TodoListProps } from "../interfaces/Todo";
import TodoTask from "./TodoTask";


function TodoList({ todos, handleTaskCompletion }: TodoListProps) {
  return (
    <div className="flex flex-col gap-2 items-center text-3xl font-bold p-4">
      {todos.length > 0 && todos.map((todo) => (
        <TodoTask key={todo.id} todo={todo} handleTaskCompletion={handleTaskCompletion} />
      ))}
    </div>
  );
}

export default TodoList;

