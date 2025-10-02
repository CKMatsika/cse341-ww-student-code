const express = require('express');
const router = express.Router();

const booksRoutes = require('./books.routes');
const authorsRoutes = require('./authors.routes');
const usersRoutes = require('./users.routes');

router.use('/books', booksRoutes);
router.use('/authors', authorsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
