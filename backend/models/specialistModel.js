const mongoose = require('mongoose')

const specialistSchema = mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      speciality: {
        type: String,
        required: true,
      },
      speciality: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      intro: {
        type: String,
        required: true,
      },
      experience: [
          {
              title: { type: String, required: true },
              years: { type: String, required: true },
              description: { type: String, required: true }
          }
      ],
      publications: [
          {
            title: { type: String, required: true },
            link: { type: String, required: true },
          }
      ]
    },
    {
      timestamps: true,
    }
  )

const Specialist = mongoose.model('Specialist', specialistSchema)

module.exports = Specialist