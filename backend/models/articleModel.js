const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      content: [
          {
            type: String,
            required: true,
          }
      ],
      tags: [
        {
          type: String,
          required: true,
        }
      ],
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Specialist',
      },
    },
    {
      timestamps: true,
    }
  )

const Article = mongoose.model('Article', articleSchema)

module.exports = Article