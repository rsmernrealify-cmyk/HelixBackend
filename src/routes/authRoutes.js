const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authControllers');

const router = express.Router();
router.get('/',(req,res)=>{
    res.send('welcome to admin panel')
})

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password', resetPassword);

module.exports = router;
