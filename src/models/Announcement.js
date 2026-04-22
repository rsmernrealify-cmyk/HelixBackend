const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String, default: "/" }
}, { timestamps: true });

module.exports = mongoose.model("Announcement", AnnouncementSchema);
