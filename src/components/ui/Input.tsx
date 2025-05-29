import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

/**
 * Input component for the application
 * @param label - The label for the input
 * @param error - Error message to display
 * @param fullWidth - Whether the input should take full width
 * @param className - Additional classes to apply
 * @param rest - Any other input attributes
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className = '',
      ...rest
    }: InputProps,
    ref
  ) => {
    const id = rest.id || rest.name || Math.random().toString(36).substring(2, 9);
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1 dark:text-text-dark">
            {label} {error ? '(Error)' : ''}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary 
        dark:bg-gray-800 dark:border-gray-700 dark:text-text-dark
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
