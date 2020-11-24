const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db')

const contactRoutes = require('./routes/contactsRoutes.js')
const articlesRoutes = require('./routes/articlesRoutes.js')
const sessionsRoutes = require('./routes/sessionsRoutes.js')
const specialistsRoutes = require('./routes/specialistsRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const fetchRoutes = require('./routes/fetchRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/contacts', contactRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/specialists', specialistsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/fetch', fetchRoutes)
app.use('/api/', authRoutes)


// let __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
