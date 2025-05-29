import React from 'react';

/**
 * Footer component for the application
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto py-4 shadow-inner dark:bg-gray-800 dark:border-t dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Todo App - Powered by Next.js & Redux</p>
      </div>
    </footer>
  );
};
