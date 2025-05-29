import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Todo, SortOption, SortDirection } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { TodoEditModal } from './TodoEditModal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  deleteCompletedTodos, 
  markAllTodos 
} from '@/redux/features/todoSlice';
import { 
  setSearchQuery, 
  setSortOption, 
  toggleSortDirection 
} from '@/redux/features/uiSlice';

/**
 * Component for displaying the list of todos with filtering and sorting options
 */
export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const { searchQuery, sortConfig } = useAppSelector(state => state.ui);
  
  
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
 
  
  // Handle opening the edit modal
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };
  
  // Handle closing the edit modal
  const handleCloseModal = () => {
    setEditingTodo(null);
  };
  
  // Filter todos by search query
  const filteredTodos = todos.filter(todo => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      todo.title.toLowerCase().includes(query) ||
      (todo.description?.toLowerCase().includes(query) || false)
    );
  });
  
  // Sort todos based on sort configuration
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const { option, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;
    
    switch (option) {
      case 'title':
        return multiplier * a.title.localeCompare(b.title);
      case 'completed':
        return multiplier * (a.completed === b.completed ? 0 : a.completed ? 1 : -1);
      case 'createdAt':
      default:
        return multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  });
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };
  
  // Handle changing sort option
  const handleSortChange = (option: SortOption) => {
    if (sortConfig.option === option) {
      dispatch(toggleSortDirection());
    } else {
      dispatch(setSortOption(option));
    }
  };
  
  // Handle deleting all completed todos
  const handleDeleteCompleted = () => {
    if (window.confirm('Are you sure you want to delete all completed todos?')) {
      dispatch(deleteCompletedTodos());
    }
  };
  
  // Handle marking all todos as complete or incomplete
  const handleMarkAll = (completed: boolean) => {
    dispatch(markAllTodos(completed));
  };
  
  // Get counts for todos
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  
  return (
    <div className="mb-6">
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <h2 className="text-xl font-bold dark:text-text-dark">Your Todos ({filteredTodos.length})</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => handleMarkAll(true)}
            disabled={totalCount === 0 || completedCount === totalCount}
          >
            Mark All Complete
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => handleMarkAll(false)}
            disabled={totalCount === 0 || completedCount === 0}
          >
            Mark All Incomplete
          </Button>
          
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDeleteCompleted}
            disabled={completedCount === 0}
          >
            Delete Completed
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <Input
          placeholder="Search todos..."
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          className="bg-white dark:bg-gray-800"
        />
      </div>
      
      <div className="mb-4 flex gap-2">
        <span className="text-sm font-medium dark:text-text-dark">Sort by:</span>
        
        <button
          onClick={() => handleSortChange('createdAt')}
          className={`text-sm px-2 py-1 rounded ${
            sortConfig.option === 'createdAt' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Date {sortConfig.option === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        
        <button
          onClick={() => handleSortChange('title')}
          className={`text-sm px-2 py-1 rounded ${
            sortConfig.option === 'title' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Title {sortConfig.option === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
        
        <button
          onClick={() => handleSortChange('completed')}
          className={`text-sm px-2 py-1 rounded ${
            sortConfig.option === 'completed' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          Status {sortConfig.option === 'completed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      
      {sortedTodos.length === 0 ? (
        <div className="p-6 text-center bg-gray-100 rounded-md dark:bg-gray-800 dark:text-text-dark">
          {searchQuery ? 'No todos match your search.' : 'No todos yet. Add one above!'}
        </div>
      ) : (
        <div>
          {sortedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onEdit={handleEditTodo} />
          ))}
        </div>
      )}
      
      <TodoEditModal
        todo={editingTodo}
        isOpen={!!editingTodo}
        onClose={handleCloseModal}
      />
    </div>
  );
};
