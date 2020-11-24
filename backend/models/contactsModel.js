const mongoose = require('mongoose')

const contactsSchema = mongoose.Schema(
    {
      address: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      phoneNumbers: [
        {
            type: String,
            required: true,
        }
      ],
      emailAdresses: [
        {
          type: String,
          required: true,
        }
      ],
      companyCode: {
        type: String,
        required: true,
      },
      bankNumber: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
  )

const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = Contacts