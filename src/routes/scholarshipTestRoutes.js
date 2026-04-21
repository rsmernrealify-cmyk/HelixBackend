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
router.post("/", upload.single("syllabus"),validateScholarshipTest, uploadScholarshipTest);

// Get All Scholarship Tests
router.get("/", getScholarshipTests);

// Get Scholarship Test by ID
router.get("/:id", getScholarshipTestById);

// Delete Scholarship Test (Admin Only)
router.delete("/:id", deleteScholarshipTest);

module.exports = router;
