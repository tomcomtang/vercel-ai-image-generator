import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { deepinfra } from '@ai-sdk/deepinfra'
import { fireworks } from '@ai-sdk/fireworks'
import { luma } from '@ai-sdk/luma'
import { togetherai } from '@ai-sdk/togetherai'
import { xai } from '@ai-sdk/xai'
import { fal } from '@ai-sdk/fal'
import { replicate } from '@ai-sdk/replicate'
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
  
  // Replicate models
  'stability-ai/stable-diffusion-3.5-medium': { provider: replicate, envKey: 'REPLICATE_API_TOKEN', envName: 'Replicate' },
  'stability-ai/stable-diffusion-3.5-large': { provider: replicate, envKey: 'REPLICATE_API_TOKEN', envName: 'Replicate' },
}

// 检查是否需要跨域头
function shouldAddCorsHeaders(request) {
  const referer = request.headers.referer;
  if (!referer) return false;
  
  // 检查是否是本地开发环境
  return referer.includes('localhost:300') || referer.includes('127.0.0.1:300');
}

// 获取跨域头
function getCorsHeaders(request) {
  const baseHeaders = {
    'Content-Type': 'application/json'
  };
  
  if (shouldAddCorsHeaders(request)) {
    return {
      ...baseHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
  }
  
  return baseHeaders;
}

// Helper to create consistent error responses
function createErrorResponse(error, message, status = 400, request) {
  return new Response(JSON.stringify({ 
    error, 
    message
  }), {
    status: status,
    headers: getCorsHeaders(request)
  });
}

export default async function onRequest(context) {
  const { request, env } = context;
  
  // 处理OPTIONS预检请求
  if (request.method === 'OPTIONS') {
    const headers = getCorsHeaders(request);
    if (shouldAddCorsHeaders(request)) {
      headers['Access-Control-Max-Age'] = '86400';
    }
    
    return new Response(null, {
      status: 200,
      headers
    });
  }
  
  try {
    // 解析请求体
    const { prompt, model , size } = request.body;

    if (!prompt) {
      return createErrorResponse('PROMPT_REQUIRED', 'Prompt is required', 400, request);
    }

    // 获取用户ID（使用IP地址作为用户标识）
    // const clientIP = request.eo && request.eo.clientIp ? request.eo.clientIp : 'unknown-ip';

    // // 检查用户频次限制
    // const rateLimitResult = await checkRateLimit(clientIP);
    // if (!rateLimitResult.allowed) {
    //   return createErrorResponse(
    //     'RATE_LIMIT_EXCEEDED', 
    //     `You have reached the limit of ${rateLimitResult.limit} images. No more images can be generated.`, 
    //     429
    //   );
    // }

    const modelConfig = modelProviderMap[model];
    if (!modelConfig) {
      return createErrorResponse('UNSUPPORTED_MODEL', 'Unsupported model', 400, request);
    }

    // 检查API密钥
    const apiKey = env[modelConfig.envKey];
    if (!apiKey) {
      return createErrorResponse('API_KEY_NOT_CONFIGURED', `${modelConfig.envName} API key not configured`, 500, request);
    }

    // 生成图片
    const imageModel = modelConfig.provider.image(model);
    console.log('Image model:', imageModel, 'Prompt:', prompt, 'Size:', size);
    
    const imageResult = await generateImage({
      model: imageModel,
      prompt: prompt,
      size: size, // 使用前端传递的尺寸
    });


    // 统一处理返回格式
    const imageUrl = `data:image/png;base64,${imageResult.image.base64}`;
    
    return new Response(JSON.stringify({
      images: [{
        url: imageUrl,
        base64: imageResult.image.base64,
      }],
    }), {
      headers: getCorsHeaders(request)
    });

  } catch (error) {
    console.error('Error generating image:', error);
    
    // 提取具体的错误信息
    let errorMessage = 'Failed to generate image';
    
    // 尝试多种错误格式
    if (error?.data?.error?.message) {
      errorMessage = error.data.error.message;
    } else if (error?.data?.message) {
      errorMessage = error.data.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return createErrorResponse('GENERATION_FAILED', errorMessage, 500, request);
  }
}

async function checkRateLimit(clientIP) {
  const key = `vercel-ai-image-generator-usage:${clientIP}`;
  let value = await my_kv.get(key);
  let count = 0;
  
  if (value) {
    try {
      count = parseInt(value);
    } catch {
      count = 0;
    }
  }
  
  const PERMANENT_LIMIT = 2; // 永久限制8张图片
  
  if (count >= PERMANENT_LIMIT) {
    return false; // 已达到限制
  } else {
    count += 1;
    await my_kv.put(key, count.toString());
    return true; // 可以继续生成
  }
}
