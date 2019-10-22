const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const UserController = require('../controllers/user');

// Handling user signup
router.post('/signup', UserController.sign_up);
// Handling user login
router.post('/login', UserController.login);
// Handling user delete
router.delete('/userId', checkAuth, UserController.delete_user);

module.exports = router;