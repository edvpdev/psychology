const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const Admin = require('../models/adminModel.js')

const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const admin = await Admin.findOne({username})
    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
})

module.exports = {
    authAdmin
}