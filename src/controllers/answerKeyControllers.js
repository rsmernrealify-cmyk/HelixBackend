const AnswerKey = require("../models/AnswerKey");

// Upload NEET Answer Key
const uploadAnswerKey = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!req.files || !req.files.questionPaper || !req.files.answerKey) {
      return res.status(400).json({ error: "Both Question Paper and Answer Key PDFs are required" });
    }

    // Generate relative URLs for the files
    const questionPaperUrl = `/uploads/${req.files.questionPaper[0].filename}`;
    const answerKeyUrl = `/uploads/${req.files.answerKey[0].filename}`;

    const newAnswerKey = new AnswerKey({
      name,
      questionPaperUrl,
      answerKeyUrl,
    });

    await newAnswerKey.save();
    
    return res.status(201).json({ message: "Answer Key uploaded successfully", newAnswerKey });
  } catch (error) {
    console.error("Answer Key Upload Error:", error);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};

// Get All Answer Keys
const getAnswerKeys = async (req, res) => {
  try {
    const keys = await AnswerKey.find().sort({ createdAt: -1 });
    res.status(200).json(keys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Answer Key
const deleteAnswerKey = async (req, res) => {
  try {
    const key = await AnswerKey.findByIdAndDelete(req.params.id);
    if (!key) {
      return res.status(404).json({ error: "Answer Key not found" });
    }
    res.status(200).json({ message: "Answer Key deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadAnswerKey,
  getAnswerKeys,
  deleteAnswerKey,
};
