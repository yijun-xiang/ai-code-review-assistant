import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  glow = false,
  variant = 'default' 
}: CardProps) {
  const variants = {
    default: 'bg-gray-900/50 backdrop-blur-sm border border-gray-800',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md border border-gray-700/50',
  };

  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden',
        variants[variant],
        {
          'hover:border-gray-700 transition-all duration-300 hover:shadow-xl': hover,
          'glow-primary': glow,
        },
        className
      )}
    >
      {children}
    </div>
  );
}