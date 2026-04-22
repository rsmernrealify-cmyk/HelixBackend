const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["NEET COURSES", "JEE COURSES", "FOUNDATION COURSES"], required: true },
  categoryId: { type: Number, required: true }, // 1 for NEET, 2 for JEE, 3 for Foundation
  description: { type: String, required: true },
  instructor: { type: String },
  lessons: { type: Number },
  students: { type: Number },
  duration: { type: String },
  price: { type: String },
  hoverDescription: { type: String },
  image: { type: String },
  isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
