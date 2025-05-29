import { z } from 'zod';

// Schema for creating a new todo
export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' }),
  description: z
    .string()
    .optional(),
});

// Schema for updating a todo
export const updateTodoSchema = z.object({
  id: z.string().min(1, { message: 'Todo ID is required' }),
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' })
    .optional(),
  description: z
    .string()
    .max(500, { message: 'Description must be less than 500 characters' })
    .optional(),
  completed: z.boolean().optional(),
});

// Type inference
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
