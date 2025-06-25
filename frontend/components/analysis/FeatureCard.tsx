import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <h4 className="text-gray-200 font-medium mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}