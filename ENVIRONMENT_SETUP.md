# 环境变量配置说明

为了使用所有 AI 图片生成模型，您需要在 `.env.local` 文件中配置以下环境变量：

## 必需的环境变量

```env
# OpenAI API Key (用于 DALL-E 3 和 DALL-E 2)
OPENAI_API_KEY=your_openai_api_key_here

# Google Generative AI API Key (用于 Imagen 3.0)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

# DeepInfra API Key (用于 Stable Diffusion 和 FLUX 模型)
DEEPINFRA_API_KEY=your_deepinfra_api_key_here

# Fireworks API Key (用于 Fireworks 平台的模型)
FIREWORKS_API_KEY=your_fireworks_api_key_here

# Luma API Key (用于 Photon 模型)
LUMA_API_KEY=your_luma_api_key_here

# TogetherAI API Key (用于 TogetherAI 平台的模型)
TOGETHER_AI_API_KEY=your_togetherai_api_key_here

# xAI API Key (用于 Grok 模型)
XAI_API_KEY=your_xai_api_key_here
```

## 如何获取 API 密钥

1. **OpenAI**: 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Google**: 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **DeepInfra**: 访问 [DeepInfra Console](https://deepinfra.com/console)
4. **Fireworks**: 访问 [Fireworks AI](https://fireworks.ai/)
5. **Luma**: 访问 [Luma Labs](https://lumalabs.ai/)
6. **TogetherAI**: 访问 [Together AI](https://together.ai/)
7. **xAI**: 访问 [xAI Console](https://console.x.ai/)

## 注意事项

- 您不需要配置所有 API 密钥，只需要配置您想要使用的模型对应的 API 密钥
- 如果某个 API 密钥未配置，使用该模型时会显示相应的错误信息
- 请确保 API 密钥的安全性，不要将其提交到版本控制系统中
