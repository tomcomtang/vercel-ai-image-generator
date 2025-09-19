import React from 'react';
import { ImageIcon, Loader2, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
}

export default function InputSection({ prompt, setPrompt, onSubmit, loading, error }: InputSectionProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-300">
          Describe your image
        </label>
        <button
          onClick={onSubmit}
          disabled={loading || !prompt.trim()}
          className="text-white py-1.5 px-3 rounded-lg border border-gray-600 hover:bg-white hover:text-black hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200 text-xs"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-1 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="mr-1 h-4 w-4" />
              Generate
            </>
          )}
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full px-4 py-4 bg-black border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent text-white placeholder-gray-500 resize-none rounded-lg transition-colors"
          rows={6}
          required
        />
      </form>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 flex items-center z-10">
          <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
          <p 
            className="text-red-400 text-sm truncate flex-1" 
            title={error}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
