import { useCallback, useRef } from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import { EditorHeader } from './EditorHeader';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';
import { MousePointer2, Sparkles } from 'lucide-react';
import type { editor } from 'monaco-editor';

loader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
  }
});

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
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = useCallback((value: string | undefined) => {
    onCodeChange(value || '');
  }, [onCodeChange]);

  const handleEditorMount: OnMount = useCallback((editor) => {
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
        {isPlaceholder && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none px-4">
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/40 rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 backdrop-blur-sm shadow-xl sm:shadow-2xl">
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3">
                <MousePointer2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-400 animate-bounce" />
                <p className="text-purple-300 text-xs sm:text-sm md:text-base font-medium sm:font-semibold">
                  <span className="hidden sm:inline">Click anywhere to start coding</span>
                  <span className="sm:hidden">Tap to start</span>
                </p>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-400 animate-pulse" />
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
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="loading-dots mb-2">
                    <span className="bg-purple-400"></span>
                    <span className="bg-pink-400"></span>
                    <span className="bg-blue-400"></span>
                  </div>
                  <p className="text-gray-400 text-sm">Loading editor...</p>
                </div>
              </div>
            }
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
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
              padding: {
                top: 8,
                bottom: 8,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}