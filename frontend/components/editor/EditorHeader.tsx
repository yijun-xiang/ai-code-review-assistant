import { FileCode2 } from 'lucide-react';
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
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <FileCode2 className="h-5 w-5" />
          <span className="font-medium">Code Editor</span>
        </div>
        <LanguageSelector
          languages={languages}
          value={selectedLanguage}
          onChange={onLanguageChange}
        />
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <span>{characterCount} chars</span>
        <span>•</span>
        <span>{lineCount} lines</span>
      </div>
    </div>
  );
}