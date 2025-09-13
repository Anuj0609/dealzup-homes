/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "picsum.photos"], // allow external images
  },
};

export default nextConfig;
