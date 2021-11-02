const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX : '',
  env: {
    ASSET_PREFIX: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX : '',
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/[[...docbook]]' },
    };
  },
};
