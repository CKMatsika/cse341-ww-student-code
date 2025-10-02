const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authors.controller');
const { authenticateToken } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.post('/', authenticateToken, ctrl.create);

module.exports = router;
