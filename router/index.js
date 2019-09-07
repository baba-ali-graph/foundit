const express = require('express');
const routes = require('./routes.js')
const router = express.Router();
const UserController = require('../controllers/userController')
const ItemController = require('../controllers/itemController')
const userModel = require('../models/user')
const userController = new UserController()
const itemController = new ItemController()

// router.get(routes.index)

router.post(routes.login, userController.Login)
router.post(routes.signup, userController.Signup)

//router.post(routes.forgotPassword)
//router.post(routes.resetPassword)

//router.get(routes.loadAllItems)
router.post(routes.addItem,itemController.AddItem)
//router.post(routes.editItem)
//router.post(routes.deleteItem)


module.exports = router;
