import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTodoSchema, CreateTodoInput } from '@/lib/validators/todo';
import { useAppDispatch } from '@/redux/hooks';
import { addTodo } from '@/redux/features/todoSlice';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';

/**
 * Form for creating a new todo
 */
export const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'all' // Validate on all events for better UX
  });  
  const titleValue = watch('title');
  const descriptionValue = watch('description');

  const onSubmit = (data: CreateTodoInput) => {
    try {
      setIsSubmitting(true);
      // Create the todo payload with explicit description handling
      const todoPayload = {
        title: data.title.trim(),
        description: data.description ? data.description.trim() : '',
      };
      dispatch(addTodo(todoPayload));
      reset();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 dark:text-text-dark">Add New Todo</h2>
      
      <Input
        label="Title"
        fullWidth
        placeholder="Enter todo title"
        {...register('title')}
        error={errors.title?.message}
      />
      
      <TextArea
        label="Description (optional)"
        fullWidth
        placeholder="Enter todo description"
        rows={3}
        {...register('description')}
        error={errors.description?.message}
      />
      
   
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </Button>
    </form>
  );
};
