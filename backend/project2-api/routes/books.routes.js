const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/books.controller');
const validate = require('../middleware/validate');
const { bookSchema } = require('../validation/books.schema');
const { authenticateToken } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticateToken, validate(bookSchema), ctrl.create);
router.put('/:id', authenticateToken, validate(bookSchema), ctrl.update);
router.delete('/:id', authenticateToken, ctrl.remove);

module.exports = router;
