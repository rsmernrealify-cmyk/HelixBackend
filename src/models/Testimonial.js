const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Image URL
  description: { type: String, required: true, maxlength: 500 },
  name: { type: String, required: true },
  role: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", TestimonialSchema);
