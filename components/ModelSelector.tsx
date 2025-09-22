import React from 'react';
import CustomDropdown from './CustomDropdown';

interface ModelSelectorProps {
  model: string;
  onModelChange: (model: string) => void;
}

const modelOptions = [
  // Fireworks Models (启用)
  { value: 'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0', label: 'Fireworks/Stable Diffusion XL 1024 V1.0' },
  { value: 'accounts/fireworks/models/playground-v2-1024px-aesthetic', label: 'Fireworks/Playground V2 1024px Aesthetic' },
  { value: 'accounts/fireworks/models/flux-1-dev-fp8', label: 'Fireworks/FLUX 1 Dev FP8' },
  
  // FAL Models (启用)
  { value: 'fal-ai/flux/dev', label: 'FAL/FLUX Dev' },
  { value: 'fal-ai/flux/schnell', label: 'FAL/FLUX Schnell' },
  { value: 'fal-ai/flux-pro/v1.1', label: 'FAL/FLUX Pro V1.1' },
  
  // OpenAI Models (启用)
  { value: 'dall-e-3', label: 'OpenAI/DALL-E 3' },
  { value: 'dall-e-2', label: 'OpenAI/DALL-E 2' },
  
  // Replicate Models (启用) - 较旧但稳定的版本
  { value: 'stability-ai/stable-diffusion-3.5-medium', label: 'Replicate/Stable Diffusion 3.5 Medium', disabled: true },
  { value: 'stability-ai/stable-diffusion-3.5-large', label: 'Replicate/Stable Diffusion 3.5 Large', disabled: true },
  
  // Google Models (禁用)
  { value: 'imagen-3.0-generate-002', label: 'Google/Imagen 3.0 Generate 002', disabled: true },
  
  // DeepInfra Models (禁用)
  { value: 'stabilityai/sdxl-turbo', label: 'DeepInfra/Stable Diffusion XL Turbo', disabled: true },
  { value: 'black-forest-labs/FLUX-1-dev', label: 'DeepInfra/FLUX 1 Dev', disabled: true },
  { value: 'black-forest-labs/FLUX-1-schnell', label: 'DeepInfra/FLUX 1 Schnell', disabled: true },
  
  // Luma Models (禁用)
  { value: 'photon-1', label: 'Luma/Photon 1', disabled: true },
  { value: 'photon-flash-1', label: 'Luma/Photon Flash 1', disabled: true },
  
  // TogetherAI Models (禁用)
  { value: 'stabilityai/stable-diffusion-xl-base-1.0', label: 'TogetherAI/Stable Diffusion XL Base 1.0', disabled: true },
  { value: 'black-forest-labs/FLUX.1-dev', label: 'TogetherAI/FLUX.1 Dev', disabled: true },
  { value: 'black-forest-labs/FLUX.1-schnell', label: 'TogetherAI/FLUX.1 Schnell', disabled: true },
  
  // xAI Models (禁用)
  { value: 'grok-2-image', label: 'xAI/Grok 2 Image', disabled: true },
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
