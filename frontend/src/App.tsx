import {useReducer, useEffect} from 'react';
import type { Todo } from "./interfaces/Todo";
import TodoList from "./components/TodoList"
import AddTodo from './components/AddTodo';
import { todosReducer, initialTodos } from './hooks/todosReducer';

function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleAddTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const handleTaskCompletion = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
    
  useEffect(() => {
    const getToDoList = async () => {
      const serverResponse = await fetch("http://localhost:3000/todos");
      if (!serverResponse.ok) {
        return;
      }
      const allTodos = await serverResponse.json();
      dispatch({ type: 'SET_TODOS', payload: allTodos });
    };

    getToDoList();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className='text-3xl font-bold p-4 text-center'>Todo List</h1>
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} handleTaskCompletion={handleTaskCompletion} handleDeleteTodo={handleDeleteTodo} />
    </div>
  )
}

export default App
