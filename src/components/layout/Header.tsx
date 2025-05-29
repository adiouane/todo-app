import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

/**
 * Header component for the application
 */
export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary dark:text-text-dark">Todo App</h1>
        <ThemeToggle />
      </div>
    </header>
  );
};
