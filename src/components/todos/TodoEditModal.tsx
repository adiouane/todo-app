import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTodoSchema, UpdateTodoInput } from '@/lib/validators/todo';
import { useAppDispatch } from '@/redux/hooks';
import { updateTodo } from '@/redux/features/todoSlice';
import { Todo } from '@/types/todo';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';

interface TodoEditModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal for editing a todo item
 * @param todo - The todo item to edit
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to call when the modal is closed
 */
export const TodoEditModal: React.FC<TodoEditModalProps> = ({ todo, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
    values: todo ? {
      id: todo.id,
      title: todo.title,
      description: todo.description || '',
      completed: todo.completed,
    } : undefined,
  });
  // Reset form when todo changes
  React.useEffect(() => {
    if (todo) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Editing todo:', todo);
      }
      reset({
        id: todo.id,
        title: todo.title,
        description: todo.description || '',
        completed: todo.completed,
      });
    }
  }, [todo, reset]);

  const onSubmit = (data: UpdateTodoInput) => {
    console.log('Submitting updated todo:', data);
    dispatch(updateTodo(data));
    console.log('Todo updated in Redux');
    onClose();
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-text-dark">Edit Todo</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            fullWidth
            {...register('title')}
            error={errors.title?.message}
          />
          
          <TextArea
            label="Description (optional)"
            fullWidth
            rows={3}
            {...register('description')}
            error={errors.description?.message}
          />
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="completed"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...register('completed')}
            />
            <label htmlFor="completed" className="ml-2 block text-sm dark:text-text-dark">
              Mark as completed
            </label>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
