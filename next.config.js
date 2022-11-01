const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,    
  mode: 'production',
  skipWaiting: true,
})

module.exports = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['media.valorant-api.com'],
  },
})
