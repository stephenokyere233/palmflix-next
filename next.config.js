/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "cdn.dribbble.com", "global-uploads.webflow.com", "lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
    // unoptimized: true
  }
}

module.exports = nextConfig
