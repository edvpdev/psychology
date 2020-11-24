const express = require('express')
const router = express.Router()

const {
    getContacts
} = require('../controllers/contactsController.js')

router.route('/').get(getContacts)

module.exports = router