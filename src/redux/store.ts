import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import uiReducer from './features/uiSlice';

// Create a more explicit store configuration
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    ui: uiReducer,
  },
  // This middleware is added by default, but we can customize it
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
        serializableCheck: {
        // Ignore these action types
        ignoredActions: ['todos/addTodo', 'todos/updateTodo', 'todos/toggleTodoComplete'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.createdAt', 'payload.updatedAt'],
        // Ignore these paths in the state
        ignoredPaths: ['todos.todos'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
