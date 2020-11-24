const mongoose = require('mongoose')
const dotenv = require('dotenv')
const specialists = require('./data/specialists')
const contacts = require('./data/contacts')
const articles = require('./data/articles')
const sessions = require('./data/sessions')
const Specialist = require('./models/specialistModel')
const Article = require('./models/articleModel')
const Session = require('./models/sessionModel')
const Contacts = require('./models/contactsModel')
const Admin = require('./models/adminModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

const importData = async () => {
  try {
    await Specialist.deleteMany()
    await Article.deleteMany()
    await Session.deleteMany()
    await Contacts.deleteMany()
    await Admin.deleteMany()

    const createdSpecialists = await Specialist.insertMany(specialists)

    const sampleArticles = articles.map((article) => {
      return { ...article, author: createdSpecialists[getRandomInt(createdSpecialists.length)] }
    })

    const sampleSessions = sessions.map((session) => {
        return { ...session, holder: createdSpecialists[getRandomInt(createdSpecialists.length)] }
    })

    await Article.insertMany(sampleArticles)
    await Session.insertMany(sampleSessions)
    await Contacts.insertMany(contacts)
    await Admin.create({
      username: 'admin',
      password: process.env.ADMIN_PW
    })
    // const admin = await new Admin({
    //   username: 'admin',
    //   password: process.env.ADMIN_PW
    // })
    // admin.save();
    // await Admin.insertOne({
    //   username: 'admin',
    //   password: process.env.ADMIN_PW
    // })

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Specialist.deleteMany()
    await Article.deleteMany()
    await Session.deleteMany()
    await Contacts.deleteMany()
    await Admin.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
