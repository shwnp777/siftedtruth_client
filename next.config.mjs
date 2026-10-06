/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add your CloudFront domain here once S3 + CloudFront are set up, e.g.
    // remotePatterns: [{ protocol: 'https', hostname: 'dxxxxxxxx.cloudfront.net' }],
    remotePatterns: [],
  },
};

export default nextConfig;
