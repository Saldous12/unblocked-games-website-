const express = require('express');
const httpProxy = require('http-proxy-middleware');
const app = express();

const targetUrl = 'https://www.google.com'; // or other search engine

app.use('/search', httpProxy.createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/search': '',  // Remove /search from the URL
  },
}));

app.listen(3000, () => {
  console.log('Proxy server running at http://localhost:3000');
});
