import {useReducer, useEffect, useState, useMemo} from 'react';
import type { Todo, FilterType } from "./interfaces/Todo";
import TodoList from "./components/TodoList"
import AddTodo from './components/AddTodo';
import { todosReducer, initialTodos } from './hooks/todosReducer';
import FilterTodo from './components/FilterTodo';
import { getTodos, updateTodoCompletion, deleteTodo } from './services/todoApi';

function App() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [filter, setFilter] = useState<FilterType>('ALL');

  const handleDeleteTodo = async (id: string) => {
    const result = await deleteTodo(id);
    if (result.success) {
      dispatch({ type: 'DELETE_TODO', payload: id });
    } else {
      console.error('Failed to delete todo:', result.error);
      // You could add user-facing error handling here (toast, alert, etc.)
    }
  };

  const handleAddTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const handleTaskCompletion = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const newCompletionStatus = !todo.isCompleted;
    const result = await updateTodoCompletion(id, newCompletionStatus);
    if (result.success) {
      dispatch({ type: 'TOGGLE_TODO', payload: id });
    } else {
      console.error('Failed to update todo:', result.error);
      // You could add user-facing error handling here (toast, alert, etc.)
    }
  };
  
  const handleFilterTodo = (filter: FilterType) => {
    setFilter(filter);
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'ALL') {
      return todos;
    } else if (filter === 'COMPLETED') {
      return todos.filter(todo => todo.isCompleted === true);
    } else {
      return todos.filter(todo => todo.isCompleted === false);
    }
  }, [todos, filter]);
    
  useEffect(() => {
    const getToDoList = async () => {
      const result = await getTodos();
      if (result.success) {
        dispatch({ type: 'SET_TODOS', payload: result.data });
      } else {
        console.error('Failed to fetch todos:', result.error);
        // You could add user-facing error handling here (toast, alert, etc.)
      }
    };

    getToDoList();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className='text-3xl font-bold p-4 text-center'>Todo List</h1>
      <AddTodo handleAddTodo={handleAddTodo} />
      <div className="flex flex-col items-center justify-center">
      <FilterTodo handleFilterTodo={handleFilterTodo} currentFilter={filter} />
      <TodoList todos={filteredTodos} handleTaskCompletion={handleTaskCompletion} handleDeleteTodo={handleDeleteTodo} />
      </div>
    </div>
  )
}

export default App
