// 模型到支持尺寸的映射配置
export const modelSizeMapping: Record<string, string[]> = {
  // Fireworks Models
  'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0': ['1024x1024'],
  'accounts/fireworks/models/playground-v2-1024px-aesthetic': ['1024x1024'],
  'accounts/fireworks/models/flux-1-dev-fp8': ['1024x1024'],
  
  // FAL Models
  'fal-ai/flux/dev': ['1024x1024'],
  'fal-ai/flux/schnell': ['256x256'],
  'fal-ai/flux-pro/v1.1': ['1024x1024'],
  
  // OpenAI Models
  'dall-e-3': ['1024x1024', '1024x1792', '1792x1024'],
  'dall-e-2': ['256x256', '512x512', '1024x1024'],
  
  // Replicate Models
  'stability-ai/stable-diffusion-3.5-medium': ['512x512', '768x768', '1024x1024'],
  'stability-ai/stable-diffusion-3.5-large': ['512x512', '768x768', '1024x1024'],
  
  // Google Models (禁用)
  'imagen-3.0-generate-002': ['1024x1024'],
  
  // DeepInfra Models (禁用)
  'stabilityai/sdxl-turbo': ['512x512', '1024x1024'],
  'black-forest-labs/FLUX-1-dev': ['1024x1024'],
  'black-forest-labs/FLUX-1-schnell': ['1024x1024'],
  
  // Luma Models (禁用)
  'photon-1': ['1024x1024'],
  'photon-flash-1': ['1024x1024'],
  
  // TogetherAI Models (禁用)
  'stabilityai/stable-diffusion-xl-base-1.0': ['1024x1024'],
  'black-forest-labs/FLUX.1-dev': ['1024x1024'],
  'black-forest-labs/FLUX.1-schnell': ['1024x1024'],
  
  // xAI Models (禁用)
  'grok-2-image': ['1024x1024'],
};

// 获取模型支持的尺寸列表
export function getSupportedSizes(model: string): string[] {
  return modelSizeMapping[model] || ['1024x1024']; // 默认返回 1024x1024
}

// 检查模型是否支持某个尺寸
export function isSizeSupported(model: string, size: string): boolean {
  const supportedSizes = getSupportedSizes(model);
  return supportedSizes.includes(size);
}

// 获取模型的默认尺寸（第一个支持的尺寸）
export function getDefaultSize(model: string): string {
  const supportedSizes = getSupportedSizes(model);
  return supportedSizes[0] || '1024x1024';
}
