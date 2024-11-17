const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy Middleware
app.use(
    '/proxy',
    createProxyMiddleware({
        target: 'https://www.google.com', // Default proxy to Google
        changeOrigin: true,
        pathRewrite: {
            '^/proxy': '', // Remove '/proxy' from the URL path
        },
    })
);

// Static Files
app.use(express.static('public'));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
