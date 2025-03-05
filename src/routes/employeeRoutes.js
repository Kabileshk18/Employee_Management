const express = require('express')
const path = require('path')
const router = express.Router()
const { authenticateUser, authorizeUser } = require(path.join(__dirname,'..','middleware','authMiddleware.js'))
const { addEmployee, getAllEmployee, getSpecificEmployee, deleteSpecificEmployee, updateSpecificEmployee} = require(path.join(__dirname,'..','controllers','employeeController.js'))

router.post('/', authenticateUser, addEmployee)
router.get('/', authenticateUser , authorizeUser('admin','hr'), getAllEmployee)
router.get('/:id', authenticateUser, authorizeUser('admin, hr'), getSpecificEmployee)
router.put('/:id', authenticateUser ,updateSpecificEmployee)
router.delete('/:id', authenticateUser, authorizeUser('hr'), deleteSpecificEmployee)


module.exports = router