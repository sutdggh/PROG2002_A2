const express = require('express');
const cors = require('cors');
const { getConnection } = require('./event_db');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
