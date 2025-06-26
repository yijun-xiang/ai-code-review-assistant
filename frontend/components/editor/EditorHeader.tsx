import { FileCode2, Hash, FileText } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../../types';

interface EditorHeaderProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  characterCount: number;
  lineCount: number;
}

export function EditorHeader({
  languages,
  selectedLanguage,
  onLanguageChange,
  characterCount,
  lineCount,
}: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center space-x-4">
        {/* Title with icon */}
        <div className="flex items-center space-x-2 text-sm">
          <FileCode2 className="h-4 w-4 text-purple-400" />
          <span className="font-medium text-gray-200">Code Editor</span>
          <span className="text-xs text-gray-500">AI-Enhanced</span>
        </div>
        
        {/* Language Selector */}
        <LanguageSelector
          languages={languages}
          value={selectedLanguage}
          onChange={onLanguageChange}
        />
      </div>
      
      {/* Compact Stats */}
      <div className="flex items-center space-x-3 text-xs text-gray-500">
        <span className="flex items-center space-x-1">
          <Hash className="h-3 w-3" />
          <span className="font-mono">{characterCount}</span>
          <span>chars</span>
        </span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center space-x-1">
          <FileText className="h-3 w-3" />
          <span className="font-mono">{lineCount}</span>
          <span>lines</span>
        </span>
      </div>
    </div>
  );
}