interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  enhanced?: boolean;
}

export function FeatureCard({ icon, title, description, enhanced = false }: FeatureCardProps) {
  if (enhanced) {
    return (
      <div className="group flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="flex-shrink-0 mt-0.5 p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-gray-200 font-medium mb-1 group-hover:text-purple-300 transition-colors">
            {title}
          </h4>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    );
  }

  // 原始样式
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