import { NextRequest, NextResponse } from 'next/server'
import { experimental_generateImage as generateImage } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createDeepInfra } from '@ai-sdk/deepinfra'
import { createFireworks } from '@ai-sdk/fireworks'
import { createLuma } from '@ai-sdk/luma'
import { createTogetherAI } from '@ai-sdk/togetherai'
import { createXai } from '@ai-sdk/xai'
import { createFal } from '@ai-sdk/fal'
import { createReplicate } from '@ai-sdk/replicate'

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

// Type definitions
type ImageSize = '256x256' | '512x512' | '768x768' | '1024x1024' | '1024x1792' | '1792x1024'

interface ParsedRequestBody {
  prompt: string
  model: string
  size?: ImageSize
}

class AiRouteError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number,
    public params?: Record<string, string>
  ) {
    super(message)
    this.name = 'AiRouteError'
  }
}

// Model to provider mapping
const modelProviderMap = {
  // OpenAI models
  'dall-e-3': { provider: createOpenAI, envKey: 'OPENAI_API_KEY', envName: 'OpenAI' },
  'dall-e-2': { provider: createOpenAI, envKey: 'OPENAI_API_KEY', envName: 'OpenAI' },
  
  // Google models
  'imagen-3.0-generate-002': { provider: createGoogleGenerativeAI, envKey: 'GOOGLE_GENERATIVE_AI_API_KEY', envName: 'Google' },
  
  // DeepInfra models
  'stabilityai/sdxl-turbo': { provider: createDeepInfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  'black-forest-labs/FLUX-1-dev': { provider: createDeepInfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  'black-forest-labs/FLUX-1-schnell': { provider: createDeepInfra, envKey: 'DEEPINFRA_API_KEY', envName: 'DeepInfra' },
  
  // Fireworks models
  'accounts/fireworks/models/stable-diffusion-xl-1024-v1-0': { provider: createFireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  'accounts/fireworks/models/playground-v2-1024px-aesthetic': { provider: createFireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  'accounts/fireworks/models/flux-1-dev-fp8': { provider: createFireworks, envKey: 'FIREWORKS_API_KEY', envName: 'Fireworks' },
  
  // Luma models
  'photon-1': { provider: createLuma, envKey: 'LUMA_API_KEY', envName: 'Luma' },
  'photon-flash-1': { provider: createLuma, envKey: 'LUMA_API_KEY', envName: 'Luma' },
  
  // TogetherAI models
  'stabilityai/stable-diffusion-xl-base-1.0': { provider: createTogetherAI, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  'black-forest-labs/FLUX.1-dev': { provider: createTogetherAI, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  'black-forest-labs/FLUX.1-schnell': { provider: createTogetherAI, envKey: 'TOGETHER_AI_API_KEY', envName: 'TogetherAI' },
  
  // xAI models
  'grok-2-image': { provider: createXai, envKey: 'XAI_API_KEY', envName: 'xAI' },
  
  // FAL models - Use exact model names as defined in @ai-sdk/fal types
  'fal-ai/flux/schnell': { provider: createFal, envKey: 'FAL_API_KEY', envName: 'FAL' },
  
  // Replicate models
  'stability-ai/stable-diffusion-3.5-medium': { provider: createReplicate, envKey: 'REPLICATE_API_TOKEN', envName: 'Replicate' },
  'stability-ai/stable-diffusion-3.5-large': { provider: createReplicate, envKey: 'REPLICATE_API_TOKEN', envName: 'Replicate' },
} as const

// Check if CORS headers should be added
function shouldAddCorsHeaders(request: NextRequest) {
  const referer = request.headers.get('referer')
  if (!referer) return false
  
  // Check if it's local development environment
  return referer.includes('localhost:300') || referer.includes('127.0.0.1:300')
}

// Get CORS headers
function getCorsHeaders(request: NextRequest) {
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (shouldAddCorsHeaders(request)) {
    return {
      ...baseHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  }
  
  return baseHeaders
}

// Helper to create consistent error responses
function createErrorResponse(error: string, message: string, status = 400, request: NextRequest) {
  return NextResponse.json(
    { error, message },
    {
      status,
      headers: getCorsHeaders(request),
    }
  )
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Set API Route maximum execution time to 30 seconds (matches frontend timeout)
// Next.js default timeout varies by deployment environment, usually 10-60 seconds
// Setting to 30 seconds here to match frontend timeout
export const maxDuration = 30 // Unit: seconds

export async function POST(request: NextRequest) {
  try {
    const body = await safeParseJson(request)
    const { prompt, model, size } = await parseRequestBody(body, request)
    
    // Log request parameters
    console.log('[AI Generate] Request params:', {
      model,
      size,
      promptLength: prompt?.length || 0
    })
    
    const modelConfig = await resolveModelConfig(model, request)
    const imageModel = await buildImageModel(modelConfig, model, request)
    const generateOptions = buildGenerationOptions(imageModel, prompt, size)
    
    // Log SDK options before calling generateImage
    console.log('[AI Generate] SDK options:', {
      model: model,
      size: generateOptions.size,
      hasSize: !!generateOptions.size,
      optionsKeys: Object.keys(generateOptions)
    })
    
    // Record start time before calling AI SDK
    const startTime = Date.now()
    const startTimeISO = new Date().toISOString()
    console.log('[AI Generate] Start time:', startTimeISO)
    
    const imageResult = await generateImage(generateOptions)
    
    // Record end time after AI generation completes
    const endTime = Date.now()
    const endTimeISO = new Date().toISOString()
    const duration = endTime - startTime
    console.log('[AI Generate] End time:', endTimeISO)
    console.log('[AI Generate] Duration:', `${duration}ms (${(duration / 1000).toFixed(2)}s)`)

    return await finalizeGeneration(imageResult, request)
  } catch (error) {
    if (error instanceof AiRouteError) {
      return createErrorResponse(error.code, error.message, error.status, request)
    }

    // For external provider errors, return the original error message as-is
    // Don't try to localize AI model provider errors since they can be in any language
    const detailMessage = buildExternalProviderErrorMessage(error)
    
    return NextResponse.json(
      { error: 'GENERATION_FAILED', message: detailMessage },
      {
        status: 500,
        headers: getCorsHeaders(request),
      }
    )
  }
}

async function safeParseJson(request: NextRequest) {
  try {
    return await request.json()
  } catch {
    throw new AiRouteError('INVALID_BODY', 'Invalid JSON body', 400)
  }
}

async function parseRequestBody(body: any, request: NextRequest): Promise<ParsedRequestBody> {
  const prompt = body?.prompt
  const model = body?.model
  const size = body?.size

  if (!prompt || typeof prompt !== 'string') {
    throw new AiRouteError('PROMPT_REQUIRED', 'Prompt is required', 400)
  }

  if (!model || typeof model !== 'string') {
    throw new AiRouteError('MODEL_REQUIRED', 'Model is required', 400)
  }

  if (size && !isValidSize(size)) {
    throw new AiRouteError('INVALID_SIZE', `Unsupported size: ${size}`, 400)
  }

  return {
    prompt,
    model,
    size,
  }
}

async function resolveModelConfig(model: string, request: NextRequest) {
  const config = modelProviderMap[model as keyof typeof modelProviderMap]
  if (!config) {
    const availableModels = Object.keys(modelProviderMap).join(', ')
    throw new AiRouteError(
      'UNSUPPORTED_MODEL',
      `Unsupported model: ${model}. Available models: ${availableModels}`,
      400
    )
  }
  return config
}

async function buildImageModel(
  modelConfig: (typeof modelProviderMap)[keyof typeof modelProviderMap],
  model: string,
  request: NextRequest
) {
  const apiKey = process.env[modelConfig.envKey]

  if (!apiKey) {
    throw new AiRouteError(
      'API_KEY_NOT_CONFIGURED',
      `${modelConfig.envName} API key not configured`,
      500,
      { provider: modelConfig.envName }
    )
  }

  const provider = modelConfig.provider({
    apiKey,
  })

  // For FAL, use the model name as-is (SDK expects full "fal-ai/..." format)
  // The @ai-sdk/fal types show models like 'fal-ai/flux/schnell', not 'fal/flux/schnell'
  let modelNameForProvider = model
  
  // For Google Imagen models, use the model name as-is
  if (model.startsWith('imagen-')) {
    modelNameForProvider = model // Keep as-is: 'imagen-3.0-generate-002', etc.
  }

  return (provider as any).image(modelNameForProvider)
}

function buildGenerationOptions(imageModel: any, prompt: string, size?: ImageSize) {
  const options: any = {
    model: imageModel,
    prompt,
  }

  if (size) {
    options.size = size
  }

  return options
}

async function finalizeGeneration(
  imageResult: Awaited<ReturnType<typeof generateImage>>,
  request: NextRequest
) {
  const imageUrl = `data:image/png;base64,${imageResult.image.base64}`

  return NextResponse.json(
    {
      imageUrl,
      images: [
        {
          url: imageUrl,
          base64: imageResult.image.base64,
        },
      ],
    },
    {
      headers: getCorsHeaders(request),
    }
  )
}

function isValidSize(size: any): size is ImageSize {
  return ['256x256', '512x512', '768x768', '1024x1024', '1024x1792', '1792x1024'].includes(size)
}

function buildExternalProviderErrorMessage(error: any) {
  let errorMessage = 'Failed to generate image'

  if (error?.data?.error?.message) {
    errorMessage = error.data.error.message
  } else if (error?.data?.message) {
    errorMessage = error.data.message
  } else if (error?.error?.message) {
    errorMessage = error.error.message
  } else if (error?.message) {
    errorMessage = error.message
  } else if (error?.response?.data?.error?.message) {
    errorMessage = error.response.data.error.message
  } else if (error?.response?.data?.error) {
    errorMessage =
      typeof error.response.data.error === 'string'
        ? error.response.data.error
        : JSON.stringify(error.response.data.error)
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return `${errorMessage}${error?.cause ? ` (Cause: ${error.cause})` : ''}`
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(request),
  })
}
