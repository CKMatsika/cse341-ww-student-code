require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/connect');
const apiRouter = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 8081; // avoid conflict with other local servers

app.use(cors());
app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// api routes
app.use('/api', apiRouter);

// error handler
app.use(errorHandler);

// Start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
});
