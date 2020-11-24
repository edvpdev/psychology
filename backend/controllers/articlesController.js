const asyncHandler = require('express-async-handler')
const Article = require('../models/articleModel.js')
const User = require('../models/specialistModel.js')

const updateArticle = asyncHandler(async(req, res) => {
  const article = await Article.findById(req.params.id)
  const { title, description, author, tags } = req.body

  const foundAuthor = await User.findOne({fullName: author})
  if (!foundAuthor) {
      res.status(400)
      throw new Error('Invalid author')
  }
  
  let today = new Date();
  let content = description.split('</p>').map((p) => {
    return p.replace('<p>','')
  })
  content.pop()

  if (article) {
    article.title = title || article.title
    article.content = content || article.content
    article.author = foundAuthor || article.author
    article.date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}` || article.date
    article.tags = tags && tags.length ? tags.map((tag) => {
      return tag.tag
    }) : article.tags

    const updatedArticle = await article.save()

    res.json({
      _id: updatedArticle._id,
      title: updatedArticle.title,
      author: updatedArticle.author,
      date: updatedArticle.date,
      tags: updatedArticle.tags,
      content: updatedArticle.content
    })
  } else {
    res.status(404)
    throw new Error('Article not found')
  }

})

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)

  if (article) {
    await article.remove()
    res.json({ message: 'Article removed' })
  } else {
    res.status(404)
    throw new Error('Article not found')
  }
})

const createArticle = asyncHandler(async(req, res) => {
  const { title, description, author, tags } = req.body

  const articleExists = await Article.findOne({ title })

  if (articleExists) {
    res.status(400)
    throw new Error('Article already exists')
  }

  const foundAuthor = await User.findOne({fullName: author})
  if (!foundAuthor) {
    res.status(400)
    throw new Error('Invalid author')
  }

  let today = new Date();
  let content = description.split('</p>').map((p) => {
    return p.replace('<p>','')
  })
  content.pop()

  const article = await Article.create({
    title: title,
    content: content,
    author: foundAuthor,
    date: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
    tags: tags && tags.map((tag) => {
      return tag.tag
    })
  })

  if (article) {
    res.status(201).json(article)
  } else {
    res.status(400)
    throw new Error('Error creating article')
  }
})

const getArticles = asyncHandler(async (req, res) => {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
  
    const count = await Article.countDocuments({})
    let articles = await Article.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    if (articles) {
        articles = await Promise.all([...articles.map( async (article) => {
            let specialist = await User.findById(article.author)
            if (specialist) {
                article.author = specialist
                return article
            } else {
              res.status(404)
              throw new Error('Specialist not found')
            }
        })])
        res.json({ articles, page, pages: Math.ceil(count / pageSize) })
    } else {
        res.status(404)
        throw new Error('Articles not found')
    }
})

const getArticleById = asyncHandler(async (req, res) => {
    let article = await Article.findById(req.params.id)

    if (article) {
      let specialist = await User.findById(article.author)
      if (specialist) {
          article.author = specialist
          res.json(article)
      } else {
        res.status(404)
        throw new Error('Specialist not found')
      }
    } else {
      res.status(404)
      throw new Error('Article not found')
    }
})

const getArticlesTitles = asyncHandler(async (req, res) => {

  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const count = await Article.countDocuments({})
  let articles = await Article.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  articles = articles.map(({_id, title}) => {
    return {
      _id,
      entry:title
    }
  })

  res.json({articles, page, pages: Math.ceil(count / pageSize)})
})

module.exports =  {
    getArticles,
    getArticleById,
    getArticlesTitles,
    createArticle,
    deleteArticle,
    updateArticle
}