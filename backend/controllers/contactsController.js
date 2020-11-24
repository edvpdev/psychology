const asyncHandler = require('express-async-handler')
const Contacts = require('../models/contactsModel.js')

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contacts.findOne({})
    res.json(contacts)
})

module.exports =  {
    getContacts
}