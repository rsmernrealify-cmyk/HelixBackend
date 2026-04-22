const mongoose = require("mongoose");

const SyllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["NEET", "JEE", "FOUNDATION"], required: true },
  fileUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Syllabus", SyllabusSchema);
