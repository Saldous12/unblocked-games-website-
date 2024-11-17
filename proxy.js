const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

// Define the target for the proxy
const targetUrl = 'https://www.google.com';  // You can change this based on your needs

// Proxy configuration
app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '',  // Remove the '/search' prefix when forwarding the request
  },
}));

// Serve static files
app.use(express.static('public'));

// Listen on port
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
