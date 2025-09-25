import React from 'react';
import CustomDropdown from './CustomDropdown';

interface ModelSelectorProps {
  model: string;
  onModelChange: (model: string) => void;
}

const modelOptions = [
  { value: 'fal-ai/flux/schnell', label: 'FAL/FLUX Schnell' },
  { value: 'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0', label: 'Fireworks/Stable Diffusion XL 1024 V1.0' },  
  // OpenAI Models (enabled)
  { value: 'dall-e-3', label: 'OpenAI/DALL-E 3' },
  { value: 'dall-e-2', label: 'OpenAI/DALL-E 2' },
  
  // Replicate Models (enabled) - older but stable versions
  { value: 'stability-ai/stable-diffusion-3.5-medium', label: 'Replicate/Stable Diffusion 3.5 Medium' },
  { value: 'stability-ai/stable-diffusion-3.5-large', label: 'Replicate/Stable Diffusion 3.5 Large' },
  
  // Google Models (enabled)
  { value: 'imagen-3.0-generate-002', label: 'Google/Imagen 3.0 Generate 002' },
  
  // DeepInfra Models (enabled)
  { value: 'stabilityai/sdxl-turbo', label: 'DeepInfra/Stable Diffusion XL Turbo' },
  { value: 'black-forest-labs/FLUX-1-dev', label: 'DeepInfra/FLUX 1 Dev' },
  { value: 'black-forest-labs/FLUX-1-schnell', label: 'DeepInfra/FLUX 1 Schnell' },
  
  // Luma Models (enabled)
  { value: 'photon-1', label: 'Luma/Photon 1' },
  { value: 'photon-flash-1', label: 'Luma/Photon Flash 1' },
  
  // TogetherAI Models (enabled)
  { value: 'stabilityai/stable-diffusion-xl-base-1.0', label: 'TogetherAI/Stable Diffusion XL Base 1.0' },
  { value: 'black-forest-labs/FLUX.1-dev', label: 'TogetherAI/FLUX.1 Dev' },
  // { value: 'black-forest-labs/FLUX.1-schnell', label: 'TogetherAI/FLUX.1 Schnell' },
  
  // xAI Models (enabled)
  { value: 'grok-2-image', label: 'xAI/Grok 2 Image' },
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
