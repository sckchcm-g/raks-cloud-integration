const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const oauthRoutes = require('./routes/oauthRoutes');

app.use('/oauth', oauthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});