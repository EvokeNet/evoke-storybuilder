/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/campaigns",
        basePath: false,
        permanent: false,
      },
    ];
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
    // localePath: resolve('./public/locales'),
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
