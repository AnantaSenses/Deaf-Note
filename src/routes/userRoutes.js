const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to login
router.post('/login', authController.loginUser);

// Route to get user information
router.get('/', authMiddleware, authController.getUser);

// Route to edit user information
router.put('/', authMiddleware, authController.updateUser);

// Route to delete user
router.delete('/', authMiddleware, authController.deleteUser);

module.exports = router;
