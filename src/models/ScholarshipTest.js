const mongoose = require("mongoose");

const ScholarshipTestSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  forClass: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  examTime: {
    type: String,
    required: true,
  },
  syllabus: { // PDF file path
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  applyLink: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ScholarshipTest", ScholarshipTestSchema);