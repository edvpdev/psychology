const asyncHandler = require('express-async-handler')
const Specialist = require('../models/specialistModel.js')

const deleteSpecialist = asyncHandler(async(req, res) => {
  const specialist = await Specialist.findById(req.params.id)
  console.log(specialist)
  

  if (specialist) {
    specialist.status = 'inactive';
    await specialist.save()
    res.json({message: 'Specialist deactivated'})
  } else {
    res.status(404)
    throw new Error('Specialist not found')
  }
})

const createSpecialist = asyncHandler(async(req, res) => {
  const { fullName, speciality, description, intro, publications, workplaces, image } = req.body

  const specialistExists = await Specialist.findOne({ fullName })

  if (specialistExists) {
    res.status(400)
    throw new Error('Specialist already exists')
  }

  let newPublications = publications.map((pub) => {
    return {
      title: pub.pub_title,
      link: pub.pub_link
    }
  })
  let newExperiences = workplaces.map((workp) => {
    return {
      title: workp.company,
      years: `${workp.start_year}-${workp.end_year}`,
      description: workp.position
    }
  })

  const specialist = await Specialist.create({
    fullName,
    speciality,
    description,
    intro,
    publications: newPublications,
    experience: newExperiences,
    status: 'active',
    image: image
  })

  if (specialist) {
    res.status(201).json(specialist)
  } else {
    res.status(400)
    throw new Error('Error creating specialist')
  }
})

const updateSpecialist = asyncHandler(async (req, res) => {
  const specialist = await Specialist.findById(req.params.id)
  const { fullName, speciality, description, intro, publications, workplaces, status, image } = req.body

  let newPublications = publications.map((pub) => {
    return {
      title: pub.pub_title,
      link: pub.pub_link
    }
  })
  let newExperiences = workplaces.map((workp) => {
    return {
      title: workp.company,
      years: `${workp.start_year}-${workp.end_year}`,
      description: workp.position
    }
  })

  if (specialist) {
    specialist.fullName = fullName || specialist.fullName
    specialist.speciality = speciality || specialist.speciality
    specialist.description = description || specialist.description
    specialist.intro = intro || specialist.intro
    specialist.publications = newPublications || specialist.publications
    specialist.experience = newExperiences || specialist.experience
    specialist.status = status || specialist.status
    specialist.image = image || specialist.image

    const updatedUser = await specialist.save()

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName, 
      speciality: updatedUser.speciality, 
      description: updatedUser.description, 
      intro: updatedUser.intro, 
      publications: updatedUser.publications, 
      experience: updatedUser.experience,
      status: updatedUser.status
    })
  } else {
    res.status(404)
    throw new Error('Specialist not found')
  }
})

const getActiveSpecialists = asyncHandler(async (req, res) => {
    const specialists = await Specialist.find({status: 'active'})
    res.json({specialists})
})

const getAllSpecialists = asyncHandler(async (req, res) => {
  const specialists = await Specialist.find({})
  res.json({specialists})
})

const getSpecialistById = asyncHandler(async (req, res) => {
    const specialist = await Specialist.findById(req.params.id)
  
    if (specialist) {
      res.json(specialist)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})

const getSpecialistsImages = asyncHandler(async (req, res) => {

  const specialists = await Specialist.find({status:'active'})
  const images = specialists.map((s) => s.image)

  res.json(images)
})

const getSpecialistsNames = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 0
  const active = req.query.active || false
  const filterObj = active == 'true' ? {status: 'active'} : {}

  const count = await Specialist.countDocuments(filterObj)
  let specialists
  if (page) {
    specialists = await Specialist.find(filterObj)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    specialists = specialists.map(({_id, fullName}) => {
      return {
        _id,
        entry:fullName
      }
    })
    res.json({specialists, page, pages: Math.ceil(count / pageSize)})
  } else {
    specialists = await Specialist.find(filterObj)
    specialists = specialists.map(({_id, fullName}) => {
      return {
        _id,
        entry:fullName
      }
    })
    res.json({specialists})
  }
})

module.exports =  {
    getActiveSpecialists,
    getAllSpecialists,
    getSpecialistById,
    getSpecialistsImages,
    getSpecialistsNames,
    createSpecialist,
    deleteSpecialist,
    updateSpecialist
}