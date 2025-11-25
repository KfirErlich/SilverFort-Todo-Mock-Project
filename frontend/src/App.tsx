import {useState, useEffect} from 'react';
import type {Todo} from "./interfaces/Todo"
import TodoList from "./components/TodoList"
function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleTaskCompletion = (id: string) => {
    const updatedTodo = todos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    setTodos(updatedTodo)
  }
    
    useEffect(() => {
        const getToDoList =async () => {
          const serverResponse = await fetch("http://localhost:3000/todos")
          if(!serverResponse.ok){

          }
          const allTodos = await serverResponse.json()
          setTodos(allTodos)
        }

      getToDoList()
    },[])


  return (
    <>
      <h1 className='text-3xl font-bold p-4 text-center'>Todo List</h1>
      <TodoList todos={todos} handleTaskCompletion={handleTaskCompletion} />
    </>
  )
}

export default App
