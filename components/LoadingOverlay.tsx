import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
        生成中...
      </h3>
      <p className="mt-2 text-gray-400 text-sm">AIがあなたの作品の世界観を描いています</p>
    </div>
  );
};