const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default {
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};
