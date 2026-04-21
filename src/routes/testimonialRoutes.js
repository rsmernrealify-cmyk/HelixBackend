const express = require("express");
const { createTestimonial, getTestimonials, getTestimonialById, deleteTestimonial,updateTestimonial } = require("../controllers/testimonialController");
const upload = require("../config/multerConfig");
const validateTestimonial = require("../validations/validateTestimonial");

const router = express.Router();


// Routes
router.post("/testimonial", upload.single("image"), validateTestimonial, createTestimonial);
router.get("/testimonials", getTestimonials);
router.get("/testimonial/:id", getTestimonialById);
// Route to update a testimonial (with image upload support)
router.put("/testimonial/:id", upload.single("image"), updateTestimonial);
router.delete("/testimonial/:id", deleteTestimonial);

module.exports = router;
