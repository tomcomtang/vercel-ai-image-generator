import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { deepinfra } from '@ai-sdk/deepinfra'
import { fireworks } from '@ai-sdk/fireworks'
import { luma } from '@ai-sdk/luma'
import { togetherai } from '@ai-sdk/togetherai'
import { xai } from '@ai-sdk/xai'
import { fal } from '@ai-sdk/fal'
import { experimental_generateImage as generateImage } from 'ai'

// 模型到提供商的映射
const modelProviderMap = {
  // OpenAI models
  'dall-e-3': { provider: openai, envKey: 'OPENAI_API_KEY', envName: 'OpenAI' },
  'dall-e-2': { provider: openai, envKey: 'OPENAI_API_KEY', envName: 'OpenAI' },
  
  // Google models
  'imagen-3.0-generate-002': { provider: google, envKey: 'GOOGLE_GENERATIVE_AI_API_KEY', envName: 'Google' },
  
  // DeepInfra models
  'stabilityai/sdxl-turbo': { provider: deepinfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  'black-forest-labs/FLUX-1-dev': { provider: deepinfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  'black-forest-labs/FLUX-1-schnell': { provider: deepinfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  
  // Fireworks models
  'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0': { provider: fireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  'accounts/fireworks/models/playground-v2-1024px-aesthetic': { provider: fireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  'accounts/fireworks/models/flux-1-dev-fp8': { provider: fireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  
  // Luma models
  'photon-1': { provider: luma, envKey: 'LUMA_API_KEY', envName: 'Luma' },
  'photon-flash-1': { provider: luma, envKey: 'LUMA_API_KEY', envName: 'Luma' },
  
  // TogetherAI models
  'stabilityai/stable-diffusion-xl-base-1.0': { provider: togetherai, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  'black-forest-labs/FLUX.1-dev': { provider: togetherai, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  'black-forest-labs/FLUX.1-schnell': { provider: togetherai, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  
  // xAI models
  'grok-2-image': { provider: xai, envKey: 'XAI_API_KEY', envName: 'xAI' },
  
  // FAL models
  'fal-ai/flux/dev': { provider: fal, envKey: 'FAL_API_KEY', envName: 'FAL' },
  'fal-ai/flux/schnell': { provider: fal, envKey: 'FAL_API_KEY', envName: 'FAL' },
  'fal-ai/flux-pro/v1.1': { provider: fal, envKey: 'FAL_API_KEY', envName: 'FAL' },
}

// Helper to create consistent error responses
function createErrorResponse(error, message, status = 400) {
  return new Response(JSON.stringify({ 
    error, 
    message
  }), {
    status: status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export default async function onRequest(context) {
  const { request, env } = context;
  
  try {
    // 解析请求体
    const { prompt, model , size = '1024x1024' } = request.body;

    if (!prompt) {
      return createErrorResponse('PROMPT_REQUIRED', 'Prompt is required', 400);
    }

    const modelConfig = modelProviderMap[model];
    if (!modelConfig) {
      return createErrorResponse('UNSUPPORTED_MODEL', 'Unsupported model', 400);
    }

    // 检查API密钥
    const apiKey = env[modelConfig.envKey];
    if (!apiKey) {
      return createErrorResponse('API_KEY_NOT_CONFIGURED', `${modelConfig.envName} API key not configured`, 500);
    }

    // 生成图片
    const imageModel = modelConfig.provider.image(model);
    console.log('Image model:', imageModel, 'Prompt:', prompt, 'Size:', size);
    
    const imageResult = await generateImage({
      model: imageModel,
      prompt: prompt,
      size: '1024x1024', // 固定为1024x1024
    });

    // 统一处理返回格式
    const imageUrl = `data:image/png;base64,${imageResult.image.base64}`;
    
    return new Response(JSON.stringify({
      images: [{
        url: imageUrl,
        base64: imageResult.image.base64,
      }],
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating image:', error);
    
    // 提取具体的错误信息
    let errorMessage = 'Failed to generate image';
    
    if (error?.data?.error?.message) {
      errorMessage = error.data.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return createErrorResponse('GENERATION_FAILED', errorMessage, 500);
  }
}
