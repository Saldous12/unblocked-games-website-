const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

// You can customize the target URL based on what you're searching
const targetUrl = 'https://www.google.com/search'; // Or any search service you want to proxy

// Proxy configuration for handling search
app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '', // Remove the `/search` prefix before forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.query.q) {
      // Ensure the query string is forwarded properly
      proxyReq.path = `/search?q=${req.query.q}`;
    }
  }
}));

// Serve static files from the public folder
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
