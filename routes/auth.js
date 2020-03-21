const express = require("express");
const router = express.Router();

const { registerUser, resetPassword, currentUser, loginUser } = require('../controller/auth')
const { protect } = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, currentUser)
// router.get('/forgotPassword', forgotPassword)
router.post('/resetPassword', protect, resetPassword)


module.exports = router