const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/register', [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email required'),
	body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
], register);

router.post('/login', [
	body('email').isEmail().withMessage('Valid email required'),
	body('password').notEmpty().withMessage('Password required')
], login);

router.post('/logout', logout);

module.exports = router;
