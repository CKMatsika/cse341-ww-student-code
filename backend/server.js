// backend/server.js
const express = require('express');
const app = express();
const PORT = 8080;

// Example data – structure should match frontend’s expectations
const data = [
  {
    id: 1,
    title: "BYU-I Frontend Demo",
    description: "This text comes from the backend API.",
    link: "https://www.byui.edu",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..." // sample base64
  },
  {
    id: 2,
    title: "Another Item",
    description: "More backend data here!",
    link: "https://example.com",
    image: "data:image/png;base64,..." 
  }
];

// Middleware to serve JSON
app.use(express.json());

// REST endpoint
app.get('/data', (req, res) => {
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
