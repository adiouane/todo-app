import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { Todo } from '@/types/todo';
import { deleteTodo, toggleTodoComplete } from '@/redux/features/todoSlice';
import { Button } from '../ui/Button';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

/**
 * Component for displaying a single todo item
 * @param todo - The todo item to display
 * @param onEdit - Function to call when the edit button is clicked
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const dispatch = useAppDispatch();
  const { id, title, description, completed, createdAt } = todo;

  // Format the date for display
  const formattedDate = new Date(createdAt).toLocaleString();

  const handleToggleComplete = () => {
    dispatch(toggleTodoComplete(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-4 mb-3 bg-white rounded-md shadow-sm border border-gray-200 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
        />
          <div className="flex-1">
          <h3 className={`text-lg font-medium ${completed ? 'line-through text-gray-500' : 'dark:text-text-dark'}`}>
            {title}
          </h3>
   
          
          {description && description.length > 0 && (
            <p className={`mt-1 text-gray-600 ${completed ? 'line-through text-gray-400' : 'dark:text-gray-400'}`}>
              {description}
            </p>
          )}
          
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-500">
            Created: {formattedDate}
          </p>
          
          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(todo)}
              aria-label="Edit todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </Button>
            
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              aria-label="Delete todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
