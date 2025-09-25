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

/**
 * Environment Variables Configuration:
 * 
 * For EdgeOne Pages deployment:
 * - Configure environment variables in EdgeOne Pages console
 * - Go to Settings > Environment Variables
 * - Add the required API keys for the models you want to use
 * 
 * For local development:
 * - Create a .env.local file in the project root
 * - Add the required API keys (see modelProviderMap below for envKey names)
 * 
 * Required environment variables:
 * - OPENAI_API_KEY: For OpenAI DALL-E models
 * - FAL_API_KEY: For FAL AI FLUX models
 * - FIREWORKS_API_KEY: For Fireworks models
 * - REPLICATE_API_TOKEN: For Replicate models
 * - GOOGLE_GENERATIVE_AI_API_KEY: For Google Imagen models
 * - DEEPINFRA_API_KEY: For DeepInfra models
 * - LUMA_API_KEY: For Luma models
 * - TOGETHER_AI_API_KEY: For TogetherAI models
 * - XAI_API_KEY: For xAI models
 */

// Model to provider mapping
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

// Check if CORS headers should be added
function shouldAddCorsHeaders(request: Request) {
  const referer = request.headers.get('referer');
  if (!referer) return false;
  
  // Check if it's local development environment
  return referer.includes('localhost:300') || referer.includes('127.0.0.1:300');
}

// Get CORS headers
function getCorsHeaders(request: Request) {
  const baseHeaders: Record<string, string> = {
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
function createErrorResponse(error: string, message: string, status = 400, request: Request) {
  return new Response(JSON.stringify({ 
    error, 
    message
  }), {
    status: status,
    headers: getCorsHeaders(request)
  });
}

export async function POST(request: Request) {
  
  try {
    // Parse request body
    const body = await request.json();
    const { prompt, model, size } = body;

    if (!prompt) {
      return createErrorResponse('PROMPT_REQUIRED', 'Prompt is required', 400, request);
    }

    const modelConfig = modelProviderMap[model as keyof typeof modelProviderMap];
    if (!modelConfig) {
      return createErrorResponse('UNSUPPORTED_MODEL', 'Unsupported model', 400, request);
    }

    // Check API key
    // Note: Configure environment variables in EdgeOne Pages console under Settings > Environment Variables
    // For local development, create .env.local file with the required API keys
    const apiKey = process.env[modelConfig.envKey];
    if (!apiKey) {
      return createErrorResponse('API_KEY_NOT_CONFIGURED', `${modelConfig.envName} API key not configured`, 500, request);
    }

    // Generate image
    const imageModel = modelConfig.provider.image(model);
    console.log('Image model:', imageModel, 'Prompt:', prompt, 'Size:', size);
    
    const imageResult = await generateImage({
      model: imageModel,
      prompt: prompt,
      size: size, // Use frontend-provided size
    });


    // Unified response format
    const imageUrl = `data:image/png;base64,${imageResult.image.base64}`;
    
    return new Response(JSON.stringify({
      images: [{
        url: imageUrl,
        base64: imageResult.image.base64,
      }],
    }), {
      headers: getCorsHeaders(request)
    });

  } catch (error: any) {
    console.error('Error generating image:', error);
    
    // Extract specific error information
    let errorMessage = 'Failed to generate image';
    
    // Try multiple error formats
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
