import { Todo } from '@/types/todo';

// Keys for local storage
const TODOS_STORAGE_KEY = 'todos-app-data';

/**
 * Load todos from local storage
 */
export const loadTodosFromStorage = (): Todo[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

/**
 * Save todos to local storage
 */
export const saveTodosToStorage = (todos: Todo[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};
