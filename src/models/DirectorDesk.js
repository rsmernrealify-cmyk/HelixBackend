const mongoose = require("mongoose");

const DirectorDeskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [{ type: String }],
  signature: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("DirectorDesk", DirectorDeskSchema);
