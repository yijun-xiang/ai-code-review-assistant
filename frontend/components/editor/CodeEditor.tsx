import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { EditorHeader } from './EditorHeader';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900/50">
      <div className="text-gray-400 flex items-center space-x-2">
        <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
        <span>Loading editor...</span>
      </div>
    </div>
  ),
});

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
}

export function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
}: CodeEditorProps) {
  const handleEditorChange = useCallback((value: string | undefined) => {
    onCodeChange(value || '');
  }, [onCodeChange]);

  const lineCount = code.split('\n').length;
  const characterCount = code.length;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorHeader
        languages={SUPPORTED_LANGUAGES}
        selectedLanguage={language}
        onLanguageChange={onLanguageChange}
        characterCount={characterCount}
        lineCount={lineCount}
      />
      
      <div className="flex-1 min-h-0 overflow-hidden bg-gray-900/50">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [],
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'all',
            suggestOnTriggerCharacters: true,
            bracketPairColorization: {
              enabled: true,
            },
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
      </div>
    </div>
  );
}