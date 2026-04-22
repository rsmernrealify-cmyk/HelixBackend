const SuccessStory = require("../models/SuccessStory");

const getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSuccessStory = async (req, res) => {
  const { title, youtubeLink } = req.body;
  try {
    const story = new SuccessStory({ title, youtubeLink });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Success story deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSuccessStories, addSuccessStory, deleteSuccessStory };
