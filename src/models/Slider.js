const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  buttonText: { type: String, default: "Apply Now" },
  link: { type: String, default: "/" }
}, { timestamps: true });

module.exports = mongoose.model("Slider", SliderSchema);
