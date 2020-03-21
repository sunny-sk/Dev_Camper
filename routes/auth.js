const express = require("express");
const router = express.Router();

const { registerUser, currentUser, loginUser } = require('../controller/auth')
const { protect } = require('../middleware/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, currentUser)


module.exports = router