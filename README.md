# Vercel AI SDK Image Generator

A powerful AI-powered image generation application built with Vercel AI SDK, supporting multiple AI providers and models for creating stunning images from text descriptions.

## Deploy

[![Deploy to EdgeOne](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=https%3A%2F%2Fgithub.com%2Ftomcomtang%2Fvercel-ai-image-generator&output-directory=.next&build-command=npm+run+build&install-command=npm+install)

## 🎨 Features

- **Multi-Provider Support**: Integration with OpenAI DALL-E, FAL AI FLUX, Fireworks, Replicate, and more
- **Dynamic Model Selection**: Choose from various AI models with different capabilities
- **Smart Size Mapping**: Each model supports specific image dimensions automatically
- **Real-time Generation**: Live countdown timer and progress tracking
- **Rate Limiting**: Built-in user rate limiting (2 images per IP)
- **Responsive Design**: Optimized for desktop and mobile devices
- **One-Click Download**: Easy image download functionality
- **CORS Handling**: Smart cross-origin request handling for development and production

## 🚀 Supported Models

### OpenAI Models

- **DALL-E 3**: High-quality image generation with multiple aspect ratios
- **DALL-E 2**: Classic image generation with various sizes

### FAL AI Models

- **FLUX Dev**: Professional-grade image generation
- **FLUX Schnell**: Fast image generation (256x256 only)
- **FLUX Pro V1.1**: Advanced image generation capabilities

### Fireworks Models

- **Stable Diffusion XL**: High-resolution image generation
- **Playground V2**: Aesthetic-focused image generation
- **FLUX 1 Dev FP8**: Optimized FLUX model

### Replicate Models

- **Stable Diffusion 3.5 Medium**: Balanced quality and speed
- **Stable Diffusion 3.5 Large**: High-quality generation

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel AI SDK** - Unified AI provider interface
- **Multiple AI Providers** - OpenAI, FAL AI, Fireworks, Replicate
- **Lucide React** - Beautiful icon library

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd vercel-ai-image-generator
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your API keys:

```bash
# OpenAI (for DALL-E models)
OPENAI_API_KEY=your_openai_api_key

# FAL AI (for FLUX models)
FAL_API_KEY=your_fal_api_key

# Fireworks (for Fireworks models)
FIREWORKS_API_KEY=your_fireworks_api_key

# Replicate (for Replicate models)
REPLICATE_API_TOKEN=your_replicate_token
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start generating images!

## 📡 API Usage

### Generate Image

```bash
POST /api/generate-image
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "model": "fal-ai/flux/schnell",
  "size": "256x256"
}
```

### Response

```json
{
  "images": [
    {
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts          # API route handler
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── CountdownTimer.tsx        # Generation timer
│   ├── CustomDropdown.tsx        # Custom dropdown
│   ├── ExamplesSection.tsx      # Example prompts
│   ├── ImageDisplay.tsx          # Image display
│   ├── InputSection.tsx          # Input components
│   ├── ModelSelector.tsx         # Model selection
│   ├── Navigation.tsx            # Navigation bar
│   ├── SizeSelector.tsx          # Size selection
│   └── modelSizeMapping.ts       # Model-size mapping
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 📚 Documentation References

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [FAL AI Documentation](https://fal.ai/docs)
- [Fireworks AI Documentation](https://fireworks.ai/docs)
- [Replicate API Documentation](https://replicate.com/docs)

## ⚠️ Important Notes

- **Rate Limiting**: Each IP is limited to 2 images permanently
- **API Keys**: Ensure all required API keys are properly configured
- **Model Compatibility**: Different models support different image sizes
- **CORS**: Automatic CORS handling for development environments
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for the amazing AI SDK
- [OpenAI](https://openai.com) for DALL-E models
- [FAL AI](https://fal.ai) for FLUX models
- [Fireworks](https://fireworks.ai) for their AI platform
- [Replicate](https://replicate.com) for model hosting

---

**Built with ❤️ using Vercel AI SDK**
