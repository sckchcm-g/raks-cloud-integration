const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const oauthRoutes = require('./routes/oauthRoutes');
const dropboxRoutes = require('./routes/dropboxRoutes');

app.use('/oauth', oauthRoutes);
app.use('/dropbox', dropboxRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});