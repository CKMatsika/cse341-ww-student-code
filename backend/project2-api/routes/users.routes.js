const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/native/users.controller');
const { authenticateToken } = require('../middleware/nativeAuth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

module.exports = router;
