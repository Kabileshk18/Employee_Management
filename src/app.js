const express = require('express')
const path = require('path')
const cors = require('cors')
const employeeRoutes = require(path.join(__dirname,'routes','employeeRoutes.js'))
const authRoutes = require(path.join(__dirname,'routes','authRoutes.js'))

const app = express()

app.use(cors())
app.use(express.json());

app.use('/api/employees', employeeRoutes)
app.use('/api/auth', authRoutes)

module.exports = app;