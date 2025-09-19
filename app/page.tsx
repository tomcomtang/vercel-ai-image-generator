'use client'

import { useState } from 'react'
import { ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import Navigation from '../components/Navigation'
import InputSection from '../components/InputSection'
import ExamplesSection from '../components/ExamplesSection'
import ModelSelector from '../components/ModelSelector'
import SizeSelector from '../components/SizeSelector'
import ImageDisplay from '../components/ImageDisplay'

interface GeneratedImage {
  url: string
  base64?: string
  revised_prompt?: string
}

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('accounts/fireworks/models/stable-diffusion-xl-1024-v1-0')
  const [size, setSize] = useState('1024x1024')
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generationTime, setGenerationTime] = useState<string | null>(null)

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError('')
    setImages([])
    setGenerationTime(null)

    try {
      // 开发模式使用本地8088端口，生产模式使用相对路径
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8088/api/generate-image'
        : '/api/generate-image'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model,
          size,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      // 记录生成完成的时间戳
      const now = new Date()
      const timestamp = now.toISOString().replace('T', ' ').replace('Z', ' UTC')
      setGenerationTime(timestamp)
      setImages(data.images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleTimeout = () => {
    setLoading(false)
    setError('Image generation timeout (20 seconds)')
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error('Failed to download image:', err)
    }
  }

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Combined Panel */}
        <div className="w-full px-6 pt-[5%] pb-6 overflow-hidden flex justify-center">
          <div className="max-w-6xl w-full h-full flex flex-col space-y-6">
            {/* First Row - Just Two Labels */}
            <div className="flex space-x-12">
              <div className="w-1/2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-300">
                    Describe your image
                  </label>
                  {error && (
                    <div className="flex items-center max-w-64">
                      <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <p
                        className="text-red-400 text-sm truncate"
                        title={error}
                      >
                        {error}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
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
              <div className="w-1/2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Generation Result
                </label>
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400">
                    {generationTime && (
                      <span>Time: {generationTime}</span>
                    )}
                  </div>
                  {images.length > 0 && (
                    <button
                      onClick={() => downloadImage(images[0].url, `generated-image-${Date.now()}.png`)}
                      className="text-white py-1.5 px-3 rounded-lg border border-gray-600 hover:bg-white hover:text-black hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black flex items-center transition-all duration-200 text-xs"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Second Row - Input Area and Image Display */}
            <div className="flex space-x-12">
              {/* Left Half - Input Area */}
              <div className="w-1/2 flex flex-col h-full">
                {/* Input Box */}
                <div className="relative" style={{ flex: '4 1 0%' }}>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="w-full h-full px-4 py-4 bg-black border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent text-white placeholder-gray-500 resize-none rounded-lg transition-colors"
                    required
                  />
                </div>
                
                {/* Spacer */}
                <div className="h-8"></div>
                
                {/* Quick Examples */}
                <div className="flex items-center" style={{ flex: '1 1 0%' }}>
                  <ExamplesSection onExampleClick={handleExampleClick} />
                </div>
                
                {/* Spacer */}
                <div className="h-8"></div>
                
                {/* Size Selection */}
                <div style={{ flex: '1 1 0%' }}>
                  <SizeSelector
                    size={size}
                    onSizeChange={setSize}
                  />
                </div>
                
                {/* Spacer */}
                <div className="h-8"></div>
                
                {/* Model Selection */}
                <div style={{ flex: '1 1 0%' }}>
                  <ModelSelector
                    model={model}
                    onModelChange={setModel}
                  />
                </div>
              </div>
              
              {/* Right Half - Image Display */}
              <div className="w-1/2 flex flex-col h-full">
                <div className="bg-black rounded-lg border border-gray-700 relative overflow-hidden flex-1">
                  <ImageDisplay
                    images={images}
                    loading={loading}
                    onDownload={downloadImage}
                    onTimeout={handleTimeout}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
