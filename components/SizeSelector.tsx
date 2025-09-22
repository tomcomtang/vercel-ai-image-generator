import React from 'react';
import CustomDropdown from './CustomDropdown';

interface SizeSelectorProps {
  size: string;
  onSizeChange: (size: string) => void;
  sizeOptions: { value: string; label: string }[];
}

export default function SizeSelector({ size, onSizeChange, sizeOptions }: SizeSelectorProps) {
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
