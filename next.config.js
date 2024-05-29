/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './app/lib/image-loader.ts'
  }
}

export default nextConfig
