import React from 'react';
import CustomDropdown from './CustomDropdown';

interface SizeSelectorProps {
  size: string;
  onSizeChange: (size: string) => void;
}

const sizeOptions = [
  { value: '1024x1024', label: '1024 x 1024' },
];

export default function SizeSelector({ size, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Image Size
      </label>
      <div className="w-full">
        <CustomDropdown
          options={sizeOptions}
          value={size}
          onChange={onSizeChange}
          placeholder="Select image size"
        />
      </div>
    </div>
  );
}
