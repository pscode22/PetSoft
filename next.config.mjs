/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "bytegrad.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
      ],
    },
  };
  
  export default nextConfig;