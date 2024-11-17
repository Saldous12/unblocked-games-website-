const express = require('express');
const { createServer: createUltravioletServer } = require('./ultraviolet/index');
const { createServer: createRammerheadServer } = require('./rammerhead/index');

const app = express();

// Serve static files
app.use(express.static('public'));

// Ultraviolet proxy
app.use('/uv', createUltravioletServer());

// Rammerhead proxy
app.use('/rammerhead', createRammerheadServer());

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
