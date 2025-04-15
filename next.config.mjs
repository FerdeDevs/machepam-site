/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        'upload.wikimedia.org',
        'images.unsplash.com',
        'images.pexels.com',
        'raw.githubusercontent.com'
      ],
    },
};

export default nextConfig;
