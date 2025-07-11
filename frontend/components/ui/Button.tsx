import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transform active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500 border border-gray-700 hover:border-gray-600',
      ghost: 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 focus:ring-gray-500',
    };
    
    const sizes = {
      sm: 'px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
      md: 'px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base',
      lg: 'px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          {
            'opacity-50 cursor-not-allowed': disabled || loading,
            'cursor-wait': loading,
            'hover:scale-[1.02]': !disabled && !loading && variant === 'primary',
          },
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';