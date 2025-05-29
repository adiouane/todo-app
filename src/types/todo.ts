// Define the structure of a Todo item
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

// Define the payload for creating a new Todo
export interface CreateTodoPayload {
  title: string;
  description?: string;
}

// Define the payload for updating a Todo
export interface UpdateTodoPayload {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

// Define sorting options for Todos
export type SortOption = 'createdAt' | 'title' | 'completed';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  option: SortOption;
  direction: SortDirection;
}
