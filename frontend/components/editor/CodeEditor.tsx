import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '../ui/Card';
import { EditorHeader } from './EditorHeader';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

// 动态导入 Monaco Editor
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-gray-400">Loading editor...</div>
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
    <Card className="h-full flex flex-col overflow-hidden">
      <EditorHeader
        languages={SUPPORTED_LANGUAGES}
        selectedLanguage={language}
        onLanguageChange={onLanguageChange}
        characterCount={characterCount}
        lineCount={lineCount}
      />
      
      <div className="flex-1 min-h-0 overflow-hidden bg-gray-900">
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
          }}
        />
      </div>
    </Card>
  );
}