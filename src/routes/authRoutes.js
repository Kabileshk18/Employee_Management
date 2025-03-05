const express = require('express')
const path = require('path')
const router = express.Router()

const { register, login } = require(path.join(__dirname,'..','controllers','authController.js'))

router.post('/register', register)
router.post('/login', login)

module.exports = router