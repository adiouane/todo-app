import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * Button component for the application
 * @param variant - The style variant of the button ('primary', 'secondary', 'danger')
 * @param size - The size of the button ('sm', 'md', 'lg')
 * @param fullWidth - Whether the button should take full width
 * @param children - The content of the button
 * @param className - Additional classes to apply
 * @param rest - Any other button attributes
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...rest
}) => {
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`rounded font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
