'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/redux/store';
import { queryClient } from '@/lib/utils/queryClient';
import { loadTodosFromStorage } from '@/lib/utils/localStorage';

export function Providers({ children }: { children: React.ReactNode }) {
  // Load todos from localStorage only on the client side
  useEffect(() => {
    try {
      const todos = loadTodosFromStorage();
      if (todos.length > 0) {
        // Dispatch an action to load todos into Redux store
        store.dispatch({ type: 'todos/setTodos', payload: todos });
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
