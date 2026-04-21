const Testimonial = require('../models/Testimonial')
const { validationResult } = require('express-validator')

// Create a new testimonial
const createTestimonial = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { title, description, name, role } = req.body

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const testimonial = new Testimonial({
      title,
      image: imageUrl,
      description,
      name,
      role,
    })

    await testimonial.save()
    res
      .status(201)
      .json({ message: 'Testimonial added successfully', testimonial })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
    res.status(200).json(testimonials)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.status(200).json(testimonial)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a testimonial by ID
const updateTestimonial = async (req, res) => {
  try {
    const { title, description, name, role } = req.body;
    const testimonialId = req.params.id;

    // Find the existing testimonial
    let testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    // Update the fields
    if (title) testimonial.title = title;
    if (description) testimonial.description = description;
    if (name) testimonial.name = name;
    if (role) testimonial.role = role;

    // If a new file is uploaded, update the image field
    if (req.file) {
      testimonial.image = req.file.path;
    }

    // Save the updated testimonial
    await testimonial.save();

    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  deleteTestimonial,
  updateTestimonial
}
