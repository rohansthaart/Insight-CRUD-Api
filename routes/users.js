const express = require('express')
const router = express.Router()
const {register, login, getUsers, getSingleUser, editUsers,deleteUser} = require('../controllers/users')


router.post('/register',register)
router.post('/login',login)
router.get('/',getUsers)

router.get('/:id',getSingleUser)
router.patch('/:id',editUsers)
router.delete('/delete/:id',deleteUser)
module.exports = router