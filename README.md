# AI Image Generator

一个使用 Vercel AI SDK 和 OpenAI DALL-E 3 的图片生成应用。

## 功能特性

- 🎨 使用 OpenAI DALL-E 3 生成高质量图片
- 📱 响应式设计，支持移动端
- 🎯 多种图片尺寸选择（正方形、竖版、横版）
- ⚡ 标准和高清质量选项
- 💾 一键下载生成的图片
- 🔄 实时生成状态显示

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **AI SDK** - Vercel AI SDK
- **@ai-sdk/openai** - OpenAI 集成
- **Lucide React** - 图标库

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

在 `.env.local` 中填入你的 OpenAI API Key：

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 在 Vercel 项目设置中添加环境变量 `OPENAI_API_KEY`
4. 部署完成！

## API 使用

### 生成图片

```bash
POST /api/generate-image
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "size": "640x640",
  "quality": "standard"
}
```

### 响应

```json
{
  "images": [
    {
      "url": "https://...",
      "revised_prompt": "A beautiful sunset over mountains with warm orange and pink hues..."
    }
  ]
}
```

## 项目结构

```
├── app/
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts          # API 路由
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面
├── .env.example                  # 环境变量示例
├── next.config.js                # Next.js 配置
├── package.json                  # 项目依赖
├── tailwind.config.js            # Tailwind 配置
└── tsconfig.json                 # TypeScript 配置
```

## 注意事项

- 需要有效的 OpenAI API Key
- DALL-E 3 每次只能生成一张图片
- 生成的图片会在 1 小时后过期
- 建议在生产环境中添加速率限制

## 许可证

MIT License
