var express = require('express');
var routes = require('routes.js')
var router = express.Router();


router.get(routes.index,)

router.post(routes.login)
router.post(routes.signup)

router.post(routes.forgotPassword)
router.post(routes.resetPassword)

router.get(routes.loadAllItems)
router.post(routes.addItem)
router.post(routes.editItem)
router.post(routes.deleteItem)


module.exports = router;
