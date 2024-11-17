const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

// Target URL for proxying, e.g., Google search
const targetUrl = 'https://www.google.com';

// Setup for proxying '/search' queries
app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '', // Remove '/search' from the URL before forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add search query to the target URL
    if (req.query.q) {
      proxyReq.path = `/search?q=${encodeURIComponent(req.query.q)}`;
    }
  },
}));

// Start the proxy server
app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
