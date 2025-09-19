const express = require('express');
const router = express.Router();

const booksRoutes = require('./books.routes');
const authorsRoutes = require('./authors.routes');

router.use('/books', booksRoutes);
router.use('/authors', authorsRoutes);

module.exports = router;
