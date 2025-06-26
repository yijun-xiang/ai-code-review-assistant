import { useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { EditorHeader } from './EditorHeader';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';
import { MousePointer2, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  isPlaceholder?: boolean;
  onEditorFocus?: () => void;
}

export function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  isPlaceholder = false,
  onEditorFocus,
}: CodeEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const handleEditorChange = useCallback((value: string | undefined) => {
    onCodeChange(value || '');
  }, [onCodeChange]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorMount = useCallback((editor: any) => {
    editorRef.current = editor;
    
    editor.onDidFocusEditorText(() => {
      if (onEditorFocus && isPlaceholder) {
        onEditorFocus();
      }
    });
  }, [onEditorFocus, isPlaceholder]);

  const handleContainerClick = useCallback(() => {
    if (onEditorFocus && isPlaceholder) {
      onEditorFocus();
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 0);
    }
  }, [onEditorFocus, isPlaceholder]);

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
      
      <div 
        className="flex-1 min-h-0 overflow-hidden bg-gray-900/50 relative cursor-text"
        onClick={handleContainerClick}
      >
        {/* Internal hint with prominent styling */}
        {isPlaceholder && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/40 rounded-xl px-8 py-4 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-center space-x-3">
                <MousePointer2 className="h-5 w-5 text-purple-400 animate-bounce" />
                <p className="text-purple-300 text-base font-semibold">
                  Click anywhere to start coding
                </p>
                <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}
        
        <div className={`h-full ${isPlaceholder ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`}>
          <Editor
            key={`${language}-${isPlaceholder}`}
            height="100%"
            language={language}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              quickSuggestions: false,
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnCommitCharacter: false,
              acceptSuggestionOnEnter: 'off',
              tabCompletion: 'off',
              fontLigatures: false,
              renderWhitespace: 'none',
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
    </div>
  );
}