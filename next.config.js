/** @type {import('next').NextConfig} */
const nextConfig = {
  // 只在生产环境使用静态导出
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
}

module.exports = nextConfig
