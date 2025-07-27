/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/classification-rdd/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/classification-rdd' : '',
}

module.exports = nextConfig