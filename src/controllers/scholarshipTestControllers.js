const ScholarshipTest = require("../models/ScholarshipTest");
const { validationResult } = require("express-validator");

// Upload Scholarship Test Details
const uploadScholarshipTest = async (req, res) => {
  try {
    const {
      examName,
      forClass,
      stream,
      examDate,
      examTime,
      fees,
      applyLink,
    } = req.body;

    // Manual validation since we temporarily removed the middleware
    if (!examName || !forClass || !stream || !examDate || !examTime || !fees) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Syllabus PDF is required" });
    }

    // Use relative URL for better reliability in dev tunnels
    const syllabusUrl = `/uploads/${req.file.filename}`;

    const newTest = new ScholarshipTest({
      examName,
      forClass,
      stream,
      examDate,
      examTime,
      syllabus: syllabusUrl,
      fees: Number(fees),
      applyLink,
    });

    await newTest.save();
    
    return res.status(201).json({ message: "Scholarship test uploaded successfully", newTest });
  } catch (error) {
    console.error("Scholarship Upload Error:", error);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};

// Get All Scholarship Tests
const getScholarshipTests = async (req, res) => {
  try {
    const tests = await ScholarshipTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Scholarship Test by ID
const getScholarshipTestById = async (req, res) => {
  try {
    const test = await ScholarshipTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ error: "Scholarship test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Scholarship Test
const deleteScholarshipTest = async (req, res) => {
  try {
    const test = await ScholarshipTest.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ error: "Scholarship test not found" });
    }
    res.status(200).json({ message: "Scholarship test deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadScholarshipTest,
  getScholarshipTests,
  getScholarshipTestById,
  deleteScholarshipTest,
};
