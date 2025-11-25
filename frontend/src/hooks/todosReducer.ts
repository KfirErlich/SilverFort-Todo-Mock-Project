import type { Todo, TodoActions } from "../interfaces/Todo";

export const initialTodos: Todo[] = [];

export const todosReducer = (state: Todo[], action: TodoActions): Todo[] => {
  switch (action.type) {
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    
    case 'ADD_TODO':
      return [...state, action.payload];
    
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          };
        }
        return todo;
      });
    
    case 'SET_TODOS':
      return action.payload;
    
    default:
      return state;
  }
};

