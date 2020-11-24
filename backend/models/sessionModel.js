const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      startAt: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      availableSlots: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      holder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Specialist',
      },
    },
    {
      timestamps: true,
    }
  )

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session