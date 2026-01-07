# Vercel AI SDK 图片生成器

一个使用 Vercel AI SDK 构建的强大 AI 图片生成应用，支持多个 AI 提供商和模型，可从文本描述创建惊艳的图片。

## 部署

[![部署到 EdgeOne](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=https%3A%2F%2Fgithub.com%2Ftomcomtang%2Fvercel-ai-image-generator&output-directory=.next&build-command=npm+run+build&install-command=npm+install)

## 🎨 功能特性

- **多提供商支持**：集成 OpenAI DALL-E、FAL AI FLUX、Fireworks、Replicate 等
- **动态模型选择**：从具有不同功能的各种 AI 模型中选择
- **智能尺寸映射**：每个模型自动支持特定的图片尺寸
- **实时生成**：实时倒计时和进度跟踪
- **速率限制**：内置用户速率限制（每个 IP 2 张图片）
- **响应式设计**：针对桌面和移动设备优化
- **一键下载**：简单的图片下载功能
- **CORS 处理**：智能跨域请求处理，适用于开发和生产环境

## 🚀 支持的模型

### OpenAI 模型

- **DALL-E 3**：高质量图片生成，支持多种宽高比
- **DALL-E 2**：经典图片生成，支持多种尺寸

### FAL AI 模型

- **FLUX Dev**：专业级图片生成
- **FLUX Schnell**：快速图片生成（仅限 256x256）
- **FLUX Pro V1.1**：高级图片生成功能

### Fireworks 模型

- **Stable Diffusion XL**：高分辨率图片生成
- **Playground V2**：专注于美学的图片生成
- **FLUX 1 Dev FP8**：优化的 FLUX 模型

### Replicate 模型

- **Stable Diffusion 3.5 Medium**：平衡质量和速度
- **Stable Diffusion 3.5 Large**：高质量生成

## 🛠️ 技术栈

- **Next.js 14** - 带有 App Router 的 React 框架
- **TypeScript** - 类型安全开发
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vercel AI SDK** - 统一的 AI 提供商接口
- **多个 AI 提供商** - OpenAI、FAL AI、Fireworks、Replicate
- **Lucide React** - 美观的图标库

## 🚀 快速开始

### 1. 克隆和安装

```bash
git clone <repository-url>
cd vercel-ai-image-generator
npm install
```

### 2. 环境设置

#### 本地开发

创建一个 `.env.local` 文件，包含您的 API 密钥：

```bash
# OpenAI（用于 DALL-E 模型）
OPENAI_API_KEY=your_openai_api_key

# FAL AI（用于 FLUX 模型）
FAL_API_KEY=your_fal_api_key

# Fireworks（用于 Fireworks 模型）
FIREWORKS_API_KEY=your_fireworks_api_key

# Replicate（用于 Replicate 模型）
REPLICATE_API_TOKEN=your_replicate_token

# Google（用于 Imagen 模型）
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# DeepInfra（用于 DeepInfra 模型）
DEEPINFRA_API_KEY=your_deepinfra_api_key

# Luma（用于 Luma 模型）
LUMA_API_KEY=your_luma_api_key

# TogetherAI（用于 TogetherAI 模型）
TOGETHER_AI_API_KEY=your_togetherai_api_key

# xAI（用于 xAI 模型）
XAI_API_KEY=your_xai_api_key
```

#### EdgeOne Pages 部署

对于 EdgeOne Pages 部署，在 EdgeOne 控制台中配置环境变量：

1. 转到您的 EdgeOne Pages 项目
2. 导航到 **设置** → **环境变量**
3. 为您想使用的模型添加所需的 API 密钥
4. 重新部署您的应用

**注意**：您只需为计划使用的模型配置 API 密钥。如果缺少必需的 API 密钥，应用程序将显示有用的错误消息。

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始生成图片！

## 📡 API 使用

### 生成图片

```bash
POST /api/ai
Content-Type: application/json

{
  "prompt": "山脉上空的美丽日落",
  "model": "fal-ai/flux/schnell",
  "size": "256x256"
}
```

### 响应

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

## 📁 项目结构

```
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # API 路由处理器
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面
├── components/
│   ├── CountdownTimer.tsx        # 生成计时器
│   ├── CustomDropdown.tsx        # 自定义下拉菜单
│   ├── ExamplesSection.tsx      # 示例提示
│   ├── ImageDisplay.tsx          # 图片显示
│   ├── InputSection.tsx          # 输入组件
│   ├── ModelSelector.tsx         # 模型选择
│   ├── Navigation.tsx            # 导航栏
│   ├── SizeSelector.tsx          # 尺寸选择
│   └── modelSizeMapping.ts       # 模型-尺寸映射
├── next.config.js                # Next.js 配置
├── package.json                  # 依赖
├── tailwind.config.js            # Tailwind 配置
└── tsconfig.json                 # TypeScript 配置
```

## 📚 文档参考

- [Vercel AI SDK 文档](https://sdk.vercel.ai/)
- [Next.js App Router 指南](https://nextjs.org/docs/app)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [FAL AI 文档](https://fal.ai/docs)
- [Fireworks AI 文档](https://fireworks.ai/docs)
- [Replicate API 文档](https://replicate.com/docs)

## ⚠️ 重要说明

- **速率限制**：每个 IP 永久限制为 2 张图片
- **API 密钥**：确保所有必需的 API 密钥都已正确配置
- **模型兼容性**：不同模型支持不同的图片尺寸
- **CORS**：自动处理开发环境的 CORS
- **错误处理**：全面的错误处理，提供用户友好的消息

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建您的功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交您的更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [Vercel](https://vercel.com) 提供的优秀 AI SDK
- [OpenAI](https://openai.com) 的 DALL-E 模型
- [FAL AI](https://fal.ai) 的 FLUX 模型
- [Fireworks](https://fireworks.ai) 的 AI 平台
- [Replicate](https://replicate.com) 的模型托管

---

**用 ❤️ 使用 Vercel AI SDK 构建**
