const express = require('express')
const router = express.Router()

const {
    getSessions,
    getSessionsTitles,
    getSessionById,
    createSession,
    deleteSession,
    updateSession
} = require('../controllers/sessionsController.js')

router.route('/').get(getSessions).post(createSession)
router.route('/titles').get(getSessionsTitles)
router
  .route('/:id')
  .get(getSessionById)
  .delete(deleteSession)
  .put(updateSession)

module.exports = router