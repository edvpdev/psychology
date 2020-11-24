const path = require('path')
const express = require('express')
const fs = require('fs')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const fetchImage = asyncHandler(async (req, res) => {
    let file = req.query.file;

    if (file) {
        let fileLocation = path.join('/uploads', file);
        let root = path.join(__dirname,'../../')
        let pathToFile = path.join(path.resolve(root), fileLocation)

        if (fs.existsSync(pathToFile)) {
            res.sendFile(`${pathToFile}`)
        } else {
            res.status(404)
            throw new Error('File not found')
        }
    } else {
        res.status(404)
        throw new Error('Unknown route')
    }
})

router.route('/').get(
    fetchImage
)

module.exports = router
