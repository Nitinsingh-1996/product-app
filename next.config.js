// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
          port: '', // Leave empty if no specific port is required
          pathname: '/img/**', // Adjust the path pattern as needed
        },
      ],
    },
  }