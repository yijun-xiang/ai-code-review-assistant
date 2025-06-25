import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg',
        {
          'hover:border-gray-700 transition-colors duration-200': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}