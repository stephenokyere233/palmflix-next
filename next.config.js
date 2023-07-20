/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    domains: [
      "image.tmdb.org",
      "cdn.dribbble.com",
      "global-uploads.webflow.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "secure.gravatar.com",
    ],
    unoptimized: true
  },
};

module.exports = nextConfig
