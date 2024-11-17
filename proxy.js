const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

const targetUrl = 'https://www.google.com';  // The target site you're proxying

// Proxy configuration to handle search requests
app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '', // Remove /search from the path
  },
}));

// Serve static assets from the public folder
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
