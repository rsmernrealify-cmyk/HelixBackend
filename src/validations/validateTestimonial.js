const { body } = require("express-validator");

const validateTestimonial = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required"),

  body("description") 
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

  body("name")
    .trim()
    .notEmpty().withMessage("Name is required"),

  body("role")
    .trim()
    .notEmpty().withMessage("Role is required")
];

module.exports = validateTestimonial;
