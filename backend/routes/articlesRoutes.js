const express = require('express')
const router = express.Router()

const {
    getArticles,
    getArticleById,
    getArticlesTitles,
    createArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articlesController.js')

router.route('/').get(getArticles).post(createArticle)
router.route('/titles').get(getArticlesTitles)
router
  .route('/:id')
  .get(getArticleById)
  .delete(deleteArticle)
  .put(updateArticle)

module.exports = router