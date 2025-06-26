import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: 'green' | 'yellow' | 'purple' | 'blue' | 'pink';
  enhanced?: boolean;
}

export function FeatureCard({ icon, title, description, color = 'purple', enhanced = false }: FeatureCardProps) {
  const colorClasses = {
    green: {
      bg: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30 hover:border-green-400/50',
      glow: 'hover:shadow-green-400/20',
      text: 'group-hover:text-green-300',
    },
    yellow: {
      bg: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-500/30 hover:border-yellow-400/50',
      glow: 'hover:shadow-yellow-400/20',
      text: 'group-hover:text-yellow-300',
    },
    purple: {
      bg: 'from-purple-500/20 to-indigo-500/20',
      border: 'border-purple-500/30 hover:border-purple-400/50',
      glow: 'hover:shadow-purple-400/20',
      text: 'group-hover:text-purple-300',
    },
    blue: {
      bg: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      glow: 'hover:shadow-blue-400/20',
      text: 'group-hover:text-blue-300',
    },
    pink: {
      bg: 'from-pink-500/20 to-rose-500/20',
      border: 'border-pink-500/30 hover:border-pink-400/50',
      glow: 'hover:shadow-pink-400/20',
      text: 'group-hover:text-pink-300',
    },
  };

  const colors = colorClasses[color];

  if (enhanced) {
    return (
      <div className={`
        group relative flex items-start space-x-4 p-5 rounded-2xl 
        bg-gradient-to-r from-gray-800/30 to-gray-900/30 
        border ${colors.border} 
        transition-all duration-300 
        hover:scale-[1.02] hover:shadow-xl ${colors.glow}
        backdrop-blur-sm
      `}>
        {/* Background glow effect */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.bg} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl
        `}></div>
        
        {/* Icon container */}
        <div className={`
          relative flex-shrink-0 p-3 rounded-xl 
          bg-gradient-to-br ${colors.bg} 
          border ${colors.border}
          group-hover:scale-110 transition-transform duration-300
        `}>
          <div className="relative z-10">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative flex-1 space-y-1">
          <h4 className={`
            text-gray-200 font-semibold text-lg 
            ${colors.text} transition-colors duration-300
          `}>
            {title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.bg} animate-pulse`}></div>
        </div>
      </div>
    );
  }

  // Original simple style
  return (
    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-colors duration-200">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <h4 className="text-gray-200 font-medium mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}