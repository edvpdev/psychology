const express = require('express')
const router = express.Router()

const {
    authAdmin
} = require('../controllers/adminController.js')

router.route('/login').post(authAdmin)

module.exports = router