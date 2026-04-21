const mongoose = require("mongoose");

const teacherApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  level: {
    type: [String],
    enum: [
      "9th/10th Level",
      "11th/12th Level Medical",
      "11th/12th Level JEE"
    ],
    required: true,
  },
  teachingSubjects: { type: [String], required: true },
  cv: { type: String, required: true }, // This will store the file path or URL
}, { timestamps: true });

module.exports = mongoose.model("TeacherApplication", teacherApplicationSchema);
