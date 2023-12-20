const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./src/routes/noteRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// API routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
