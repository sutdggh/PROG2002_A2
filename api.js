const express = require('express');
const { getConnection } = require('./event_db');

const app = express();
app.use(express.json());

// Import routes
const eventsRouter = require('./routes/events');
const categoriesRouter = require('./routes/categories');

// Use routes
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
