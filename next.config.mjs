/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fonts read from disk by the share-image routes (opengraph-image.js).
  outputFileTracingIncludes: {
    '/**': ['./assets/og-fonts/**'],
  },
  images: {
    // Add your CloudFront domain here once S3 + CloudFront are set up, e.g.
    // remotePatterns: [{ protocol: 'https', hostname: 'dxxxxxxxx.cloudfront.net' }],
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'thumb.wikimedia.org' },
    ],
  },
};

export default nextConfig;
