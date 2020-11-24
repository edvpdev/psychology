const express = require('express')
const router = express.Router()

const {
    getAllSpecialists,
    getActiveSpecialists,
    getSpecialistById,
    getSpecialistsImages,
    getSpecialistsNames,
    createSpecialist,
    deleteSpecialist,
    updateSpecialist
} = require('../controllers/specialistsController.js')

router.route('/').get(getAllSpecialists).post(createSpecialist)
router.route('/images').get(getSpecialistsImages)
router.route('/names').get(getSpecialistsNames)
router.route('/active').get(getActiveSpecialists)
router
  .route('/:id')
  .get(getSpecialistById)
  .delete(deleteSpecialist)
  .put(updateSpecialist)

module.exports = router