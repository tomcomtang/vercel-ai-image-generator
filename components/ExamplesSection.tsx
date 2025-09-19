import React from 'react';
import { FaCat, FaCity, FaPalette, FaHome, FaRobot, FaTree } from 'react-icons/fa';

interface ExamplesSectionProps {
  onExampleClick: (prompt: string) => void;
}

const examples = [
  { icon: FaCat, short: "Cat", full: "A cute cat playing in a garden" },
  { icon: FaCity, short: "City", full: "Futuristic cityscape at night" },
  { icon: FaPalette, short: "Art", full: "Beautiful landscape in watercolor style" },
  { icon: FaHome, short: "Home", full: "Modern minimalist interior design" }
];

export default function ExamplesSection({ onExampleClick }: ExamplesSectionProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 w-full">
        <label className="text-sm font-medium text-gray-300">
          Quick Examples
        </label>
        <span className="text-xs text-gray-500">
          Click to generate example prompts
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {examples.map((example, index) => {
          const IconComponent = example.icon;
          return (
            <button
              key={index}
              onClick={() => onExampleClick(example.full)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-800 text-sm text-gray-400 hover:text-white transition-colors rounded-lg"
            >
              <IconComponent className="w-4 h-4" />
              <span>{example.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
