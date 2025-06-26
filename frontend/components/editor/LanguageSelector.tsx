import { Language } from '../../types';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  languages: Language[];
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelector({ languages, value, onChange }: LanguageSelectorProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none 
          bg-gray-800/60 
          text-gray-200 
          text-sm
          pl-3 pr-8 py-1.5
          rounded-md 
          border border-gray-700 
          hover:border-gray-600
          focus:border-purple-500 
          focus:outline-none 
          focus:ring-1 
          focus:ring-purple-500/20 
          transition-all 
          duration-200
          cursor-pointer
          font-medium
        "
      >
        {languages.map((lang) => (
          <option 
            key={lang.value} 
            value={lang.value}
            className="bg-gray-900"
          >
            {lang.label}
          </option>
        ))}
      </select>
      
      {/* Dropdown icon */}
      <ChevronDown className="
        absolute right-2 top-1/2 -translate-y-1/2 
        h-3 w-3 text-gray-400 
        pointer-events-none
      " />
    </div>
  );
}