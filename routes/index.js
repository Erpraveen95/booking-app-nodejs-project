const express = require('express')
const router = express.Router()
const userController = require('../controllers/index')


router.get('/',userController.getUser)

router.post('/add-user',userController.postUser)

router.delete('/delete-user/:id',userController.deleteUser)

module.exports = router