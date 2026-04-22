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
  isPopular: { type: Boolean, default: false },
  // New detailed fields
  eligible: { type: String },
  startDates: { type: String },
  mode: { type: String },
  admissionCriteria: { type: String },
  longDescription: { type: String },
  scholarshipDetails: { type: String },
  registrationStepsOnline: { type: String },
  registrationStepsOffline: { type: String },
  formLink: { type: String },
  // Quick Summary Stats & Notes
  intensity: { type: String },
  modulesCount: { type: String },
  popularityRanking: { type: String },
  noteForApplicants: { type: String }
}, { timestamps: true, strict: false });

module.exports = mongoose.model("Course", CourseSchema);
