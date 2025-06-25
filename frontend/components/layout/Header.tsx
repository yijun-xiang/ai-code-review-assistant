import { Code2, Sparkles, Brain, Cpu, Activity } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 animate-gradient-x"></div>
      </div>
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl animate-pulse"></div>
              <div className="relative flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-lg border border-purple-500/30 backdrop-blur-xl">
                <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
                <span className="text-gray-100 font-bold tracking-wider">
                  AI CODE REVIEWER
                </span>
              </div>
            </div>
            <Badge variant="success" size="sm" className="animate-pulse-slow">
              <span className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>API Connected</span>
              </span>
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span className="hidden sm:inline opacity-70">Powered by</span>
            <div className="flex items-center space-x-1 px-2 py-1 rounded bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30">
              <Cpu className="h-4 w-4 text-green-400 animate-spin-slow" />
              <span className="text-green-400 font-medium">OpenAI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}