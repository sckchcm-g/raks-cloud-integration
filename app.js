const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const oAuthRoutes = require('./routes/OauthRoutes');
const moreRoutes = require('./routes/MoreRoutes');
app.use('/', oAuthRoutes);
app.use('/', moreRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});