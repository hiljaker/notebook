const express = require('express');
const { signUp, logIn, keepLoggedIn } = require('../controllers/auth_controllers');
const { verifyAccessToken } = require('../helpers/token_verify');
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/keeploggedin", verifyAccessToken, keepLoggedIn)

module.exports = router