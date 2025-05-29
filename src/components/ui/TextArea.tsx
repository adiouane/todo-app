import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

/**
 * TextArea component for the application
 * @param label - The label for the textarea
 * @param error - Error message to display
 * @param fullWidth - Whether the textarea should take full width
 * @param className - Additional classes to apply
 * @param rest - Any other textarea attributes
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className = '',
      ...rest
    }: TextAreaProps,
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
        <textarea
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
