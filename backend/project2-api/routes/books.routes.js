const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/books.controller');
const validate = require('../middleware/validate');
const { bookSchema } = require('../validation/books.schema');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validate(bookSchema), ctrl.create);
router.put('/:id', validate(bookSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
