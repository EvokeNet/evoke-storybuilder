/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
    // localePath: resolve('./public/locales'),
  }
}

module.exports = nextConfig
