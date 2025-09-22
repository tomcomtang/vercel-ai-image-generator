import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function CountdownTimer({ isActive, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      setTimeLeft(30);
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 0.1;
          if (newTime <= 0) {
            onComplete?.();
            return 0;
          }
          return newTime;
        });
      }, 100); // 每100ms更新一次，显示小数
    } else {
      setTimeLeft(30);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* 圆形背景 */}
        <div className="w-16 h-16 bg-gray-800 border-2 border-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">{timeLeft.toFixed(1)}</span>
        </div>
        {/* 进度环 */}
        <div 
          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-blue-500 transition-all duration-100"
          style={{
            transform: `rotate(${((30 - timeLeft) * 12) - 90}deg)`, // 30秒转360度
          }}
        />
      </div>
    </div>
  );
}
