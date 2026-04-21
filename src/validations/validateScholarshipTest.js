const { body } = require("express-validator");

const validateScholarshipTest = [
  body("examName").notEmpty().withMessage("Exam Name is required"),
  body("class").notEmpty().withMessage("Class is required"),
  body("stream").notEmpty().withMessage("Stream is required"),
  body("examDate").isISO8601().withMessage("Invalid Exam Date"),
  body("examTime").notEmpty().withMessage("Exam Time is required"),
  body("fees").isNumeric().withMessage("Fees must be a number"),
];

module.exports=validateScholarshipTest