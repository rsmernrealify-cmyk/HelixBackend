const ScholarshipTest = require("../models/ScholarshipTest");

// Upload Scholarship Test Details
const uploadScholarshipTest = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { examName, class: examClass, stream, examDate, examTime, fees } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Syllabus PDF is required" });
    }

    const newTest = new ScholarshipTest({
      examName,
      class: examClass,
      stream,
      examDate,
      examTime,
      syllabus: req.file.path, // Store file path
      fees,
    });

    await newTest.save();
    res.status(201).json({ message: "Scholarship test uploaded successfully", newTest });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
