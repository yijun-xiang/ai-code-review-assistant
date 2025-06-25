import { Code2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
              <Code2 className="h-5 w-5 text-blue-400" />
              <span className="text-gray-200 font-medium">AI Code Analyzer</span>
            </div>
            <Badge variant="success" size="sm">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Online</span>
              </span>
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Powered by Advanced AI</span>
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
        </div>
      </div>
    </header>
  );
}