const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

// Set up the target URL for the proxy (for example, Google)
const targetUrl = 'https://www.google.com';

// Proxy all search requests to Google
app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '',  // Remove the '/search' part from the URL before forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.query.q) {
      proxyReq.path = `/search?q=${encodeURIComponent(req.query.q)}`;  // Add the query parameter to the path
    }
  },
}));

// Start the proxy server on port 3000
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
