const TeacherApplication = require('../models/TeacherApplication')
const upload = require('../config/multerConfig')
const { validationResult } = require("express-validator");
// Create a new teacher application
const createApplication = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const {
      fullName,
      mobileNumber,
      email,
      location,
      level,
      teachingSubjects,
    } = req.body

    if (!req.file) {
      return res.status(400).json({ error: 'CV is required' })
    }

    const application = new TeacherApplication({
      name:fullName,
      phoneNumber:mobileNumber,
      email,
      location,
      level,
      teachingSubjects: teachingSubjects.split(','), // Convert CSV string to array
      cv: req.file.filename, // Store filename
    })

    await application.save()
    res
      .status(201)
      .json({ message: 'Application submitted successfully', application })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all applications (for admin panel)
const getApplications = async (req, res) => {
  try {
    const applications = await TeacherApplication.find()
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Get a single application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await TeacherApplication.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.status(200).json(application)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Delete an application (admin only)
const deleteApplication = async (req, res) => {
  try {
    const application = await TeacherApplication.findByIdAndDelete(
      req.params.id,
    )
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.status(200).json({ message: 'Application deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports={createApplication,getApplications,getApplicationById,deleteApplication}
