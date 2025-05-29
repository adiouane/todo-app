import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from '@/types/todo';
import { v4 as uuidv4 } from 'uuid';
import { loadTodosFromStorage, saveTodosToStorage } from '@/lib/utils/localStorage';
import { normalizeDate } from '@/lib/utils/dates';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Initialize todos safely - will be empty on server, populated on client
const initialTodos: Todo[] = [];

const initialState: TodoState = {
  todos: initialTodos,
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Set todos from localStorage (client-side only)
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    
    // Add a new todo
    addTodo: (state, action: PayloadAction<CreateTodoPayload>) => {
      // Debug logging removed for production
      const { title, description } = action.payload;
      const now = new Date();
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        description: description || '',
        completed: false,
        createdAt: now,
      };
      // Debug logging removed for production
      state.todos.push(newTodo);
      saveTodosToStorage(state.todos);
      // Debug logging removed for production
    },    // Update an existing todo
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { id, ...updates } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      
      if (todoIndex !== -1) {
        const now = new Date();
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...updates,
          updatedAt: now,
        };
        saveTodosToStorage(state.todos);
      }
    },

    // Delete a todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveTodosToStorage(state.todos);
    },    // Toggle todo completion status
    toggleTodoComplete: (state, action: PayloadAction<string>) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
      
      if (todoIndex !== -1) {
        const now = new Date();
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
        state.todos[todoIndex].updatedAt = now;
        saveTodosToStorage(state.todos);
      }
    },

    // Delete all completed todos
    deleteCompletedTodos: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      saveTodosToStorage(state.todos);
    },    // Mark all todos as complete or incomplete
    markAllTodos: (state, action: PayloadAction<boolean>) => {
      const now = new Date();
      state.todos = state.todos.map(todo => ({
        ...todo,
        completed: action.payload,
        updatedAt: now,
      }));
      saveTodosToStorage(state.todos);
    },
  },
});

export const { 
  setTodos,
  addTodo, 
  updateTodo, 
  deleteTodo, 
  toggleTodoComplete, 
  deleteCompletedTodos, 
  markAllTodos 
} = todoSlice.actions;

export default todoSlice.reducer;
