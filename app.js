const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const calendlyRoutes = require('./routes/calendlyRoutes');
const dropboxRoutes = require('./routes/dropboxRoutes');
const figmaRoutes = require('./routes/figmaRoutes');

app.use('/calendly', calendlyRoutes);
app.use('/dropbox', dropboxRoutes);
app.use('/figma', figmaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});