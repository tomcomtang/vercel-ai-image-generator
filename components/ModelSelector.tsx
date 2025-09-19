import React from 'react';
import CustomDropdown from './CustomDropdown';

interface ModelSelectorProps {
  model: string;
  onModelChange: (model: string) => void;
}

const modelOptions = [
  // OpenAI Models (保留2个)
  { value: 'dall-e-3', label: 'OpenAI/DALL-E 3' },
  { value: 'dall-e-2', label: 'OpenAI/DALL-E 2' },
  
  // Google Models (保留1个)
  { value: 'imagen-3.0-generate-002', label: 'Google/Imagen 3.0 Generate 002' },
  
  // DeepInfra Models (保留3个，选择较旧版本)
  { value: 'stabilityai/sdxl-turbo', label: 'DeepInfra/Stable Diffusion XL Turbo' },
  { value: 'black-forest-labs/FLUX-1-dev', label: 'DeepInfra/FLUX 1 Dev' },
  { value: 'black-forest-labs/FLUX-1-schnell', label: 'DeepInfra/FLUX 1 Schnell' },
  
  // Fireworks Models (保留3个，选择较旧版本)
  { value: 'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0', label: 'Fireworks/Stable Diffusion XL 1024 V1.0' },
  { value: 'accounts/fireworks/models/playground-v2-1024px-aesthetic', label: 'Fireworks/Playground V2 1024px Aesthetic' },
  { value: 'accounts/fireworks/models/flux-1-dev-fp8', label: 'Fireworks/FLUX 1 Dev FP8' },
  
  // Luma Models (保留2个)
  { value: 'photon-1', label: 'Luma/Photon 1' },
  { value: 'photon-flash-1', label: 'Luma/Photon Flash 1' },
  
  // TogetherAI Models (保留3个，选择较旧版本)
  { value: 'stabilityai/stable-diffusion-xl-base-1.0', label: 'TogetherAI/Stable Diffusion XL Base 1.0' },
  { value: 'black-forest-labs/FLUX.1-dev', label: 'TogetherAI/FLUX.1 Dev' },
  { value: 'black-forest-labs/FLUX.1-schnell', label: 'TogetherAI/FLUX.1 Schnell' },
  
  // xAI Models (保留1个)
  { value: 'grok-2-image', label: 'xAI/Grok 2 Image' },
  
  // FAL Models (保留3个，选择较旧版本)
  { value: 'fal-ai/flux/dev', label: 'FAL/FLUX Dev' },
  { value: 'fal-ai/flux/schnell', label: 'FAL/FLUX Schnell' },
  { value: 'fal-ai/flux-pro/v1.1', label: 'FAL/FLUX Pro V1.1' },
];

export default function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Select Model
      </label>
      <div className="w-full">
        <CustomDropdown
          options={modelOptions}
          value={model}
          onChange={onModelChange}
          placeholder="Select a model"
        />
      </div>
    </div>
  );
}
