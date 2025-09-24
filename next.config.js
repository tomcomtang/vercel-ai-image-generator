/** @type {import('next').NextConfig} */
const nextConfig = {
  // Comment out static export because API routes need server-side rendering
  // output: 'export',  // Enable static export
  images: {
    unoptimized: true  // Disable image optimization for static export
  },
  trailingSlash: true,  // Add trailing slash for better compatibility
};

module.exports = nextConfig;
