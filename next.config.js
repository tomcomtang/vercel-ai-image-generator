/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
}

module.exports = nextConfig
