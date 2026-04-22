const Announcement = require("../models/Announcement");

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new announcement
const createAnnouncement = async (req, res) => {
  const { text, link } = req.body;
  try {
    const announcement = new Announcement({ text, link: link || "/" });
    await announcement.save();
    res.status(201).json({ message: "Announcement added successfully", announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
