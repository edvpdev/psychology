const asyncHandler = require('express-async-handler')
const Session = require('../models/sessionModel.js')
const User = require('../models/specialistModel.js')

const updateSession = asyncHandler(async(req, res) => {
    const session = await Session.findById(req.params.id)
    const { title, description, holder, startsAt, duration, av_slots, price } = req.body

    const foundHolder = await User.findOne({fullName: holder})
    if (!foundHolder) {
        res.status(400)
        throw new Error('Invalid holder')
    }

    if (session) {
        session.title = title || session.title
        session.holder = speciality || session.holder
        session.description = description || session.description
        session.startAt = startsAt || session.startAt
        session.duration = duration || session.duration
        session.availableSlots = av_slots || session.availableSlots
        session.price = price || session.price

        const updatedSession = await session.save()

        res.json({
            _id: updatedSession._id,
            fullName: updatedSession.fullName, 
            speciality: updatedSession.speciality, 
            description: updatedSession.description, 
            intro: updatedSession.intro, 
            publications: updatedSession.publications, 
            experience: updatedSession.experience,
        })
    } else {
        res.status(404)
        throw new Error('Session not found')
    }
})

const deleteSession = asyncHandler( async(req, res) => {
    const session = await Session.findById(req.params.id)

    if (session) {
        await session.remove()
        res.json({messsage: 'Session removed'})
    } else {
        res.status(404)
        throw new Error('Session not found')
    }
})

const createSession = asyncHandler(async (req, res) => {
    const { title, description, holder, startsAt, duration, av_slots, price } = req.body

    const sessionExists = await Session.findOne({ title })

    if (sessionExists) {
        res.status(400)
        throw new Error('Session already exists')
    }

    const foundHolder = await User.findOne({fullName: holder})
    if (!foundHolder) {
        res.status(400)
        throw new Error('Invalid holder')
    }

    const session = await Session.create({
        title,
        description,
        holder: foundHolder,
        startAt: startsAt,
        duration,
        availableSlots: av_slots,
        price
    })

    if (session) {
        res.status(201).json(session)
    } else {
        res.status(400)
        throw new Error('Error creating session')
    }
})

const getSessions = asyncHandler(async (req, res) => {  
    let sessions = await Session.find({})
    
    if (sessions) {
        sessions = await Promise.all([...sessions.map( async (session) => {
            let specialist = await User.findById(session.holder)
            if (specialist) {
                session.holder = specialist
                return session
            } else {
              res.status(404)
              throw new Error('Specialist not found')
            }
        })])
        res.json({sessions})
    } else {
        res.status(404)
        throw new Error('Sessions not found')
    }
})

const getSessionById = asyncHandler(async (req, res) => {
    let session = await Session.findById(req.params.id)

    if (session) {
      let holder = await User.findById(session.holder)
      if (holder) {
          session.holder = holder
          res.json(session)
      } else {
        res.status(404)
        throw new Error('Specialist not found')
      }
    } else {
      res.status(404)
      throw new Error('Article not found')
    }
})

const getSessionsTitles = asyncHandler(async (req, res) => {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1

    const count = await Session.countDocuments({})
    let sessions = await Session.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    sessions = sessions.map(({_id, title}) => {
      return {
        _id,
        entry:title
      }
    })

    res.json({sessions, page, pages: Math.ceil(count / pageSize)})
})

module.exports =  {
    getSessions,
    getSessionsTitles,
    getSessionById,
    createSession,
    deleteSession,
    updateSession
}