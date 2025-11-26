import type { Todo } from '../interfaces/Todo';

const API_BASE_URL = 'http://localhost:3000/todos';

type ApiResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

/**
 * Get all todo tasks
 * @returns Promise with success/error result containing array of todos
 */
export const getTodos = async (): Promise<ApiResult<Todo[]>> => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch todos: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Add a new todo task
 * @param description - The description of the todo task
 * @param isCompleted - Whether the task is completed (defaults to false)
 * @returns Promise with success/error result
 */
export const addTodo = async (description: string, isCompleted: boolean = false): Promise<ApiResult<Todo>> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, isCompleted }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to add todo: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Update the isCompleted status of a specific todo task
 * @param id - The id of the todo to update
 * @param isCompleted - The new completion status
 * @returns Promise with success/error result
 */
export const updateTodoCompletion = async (id: string, isCompleted: boolean): Promise<ApiResult<Todo>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to update todo: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Delete a todo task
 * @param id - The id of the todo to delete
 * @returns Promise with success/error result
 */
export const deleteTodo = async (id: string): Promise<ApiResult<void>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to delete todo: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
