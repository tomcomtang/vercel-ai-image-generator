import { ImageIcon, Github } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AI Image Generator</h1>
            <span className="text-sm text-gray-400 ml-4">Powered by Vercel AI SDK</span>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://github.com/tomcomtang/vercel-ai-image-generator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
