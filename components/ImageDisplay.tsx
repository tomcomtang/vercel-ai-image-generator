import React from 'react';
import { ImageIcon } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface GeneratedImage {
  url: string;
  revised_prompt?: string;
  base64?: string;
}

interface ImageDisplayProps {
  images: GeneratedImage[];
  loading: boolean;
  onDownload: (url: string, filename: string) => void;
  onTimeout?: () => void;
}

export default function ImageDisplay({ images, loading, onDownload, onTimeout }: ImageDisplayProps) {
  return (
    <div className="w-full h-full relative">
      {/* 始终存在的透明占位图片撑住高度 */}
      <img
        src="/public.png"
        alt="placeholder"
        className="w-full h-full object-cover opacity-0"
      />
      
      {/* 根据状态显示不同内容 */}
      {loading ? (
        /* 生成中的倒计时遮罩层 */
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="text-center">
            <CountdownTimer isActive={loading} onComplete={onTimeout} />
            <p className="text-white text-sm mt-4">Generating image...</p>
          </div>
        </div>
      ) : images.length === 0 ? (
        /* 无图片时的提示文案 */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">Generated image will appear here</p>
            <p className="text-gray-500 text-sm mt-2">Enter a description on the left and click generate to start</p>
          </div>
        </div>
      ) : (
        /* 有图片时显示实际图片 */
        <div className="absolute inset-0 p-0.5 bg-gray-400 rounded-lg">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Generated image ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
