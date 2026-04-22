const express = require("express");
const router = express.Router();
const validateScholarshipTest=require("../validations/validateScholarshipTest")
const upload=require("../config/multerConfig")
const {
  uploadScholarshipTest,
  getScholarshipTests,
  getScholarshipTestById,
  deleteScholarshipTest,
} = require("../controllers/scholarshipTestControllers");

// Upload Scholarship Test Details
router.post("/", upload.single("syllabus"), uploadScholarshipTest);

// Get All Scholarship Tests
router.get("/", getScholarshipTests);

router.get("/ping", (req, res) => res.send("Scholarship router is alive"));
router.post("/test-post", (req, res) => res.json({ message: "Test Post Worked", body: req.body }));

// Get Scholarship Test by ID
router.get("/:id", getScholarshipTestById);

// Delete Scholarship Test (Admin Only)
router.delete("/:id", deleteScholarshipTest);

module.exports = router;
