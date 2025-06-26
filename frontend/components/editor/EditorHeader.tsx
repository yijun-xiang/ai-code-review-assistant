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
    <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
          <FileCode2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
          <span className="font-medium text-gray-200 hidden sm:inline">Code Editor</span>
          <span className="font-medium text-gray-200 sm:hidden">Editor</span>
          <span className="text-[10px] sm:text-xs text-gray-500 hidden md:inline">AI-Enhanced</span>
        </div>
        
        <LanguageSelector
          languages={languages}
          value={selectedLanguage}
          onChange={onLanguageChange}
        />
      </div>
      
      <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 text-[10px] sm:text-xs text-gray-500">
        <span className="flex items-center space-x-0.5 sm:space-x-1">
          <Hash className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span className="font-mono">{characterCount}</span>
          <span className="hidden sm:inline">chars</span>
        </span>
        <span className="text-gray-700">|</span>
        <span className="flex items-center space-x-0.5 sm:space-x-1">
          <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span className="font-mono">{lineCount}</span>
          <span className="hidden sm:inline">lines</span>
        </span>
      </div>
    </div>
  );
}