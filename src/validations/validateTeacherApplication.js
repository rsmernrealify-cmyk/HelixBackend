const { body } = require("express-validator");

const validateTeacherApplication = [
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),

  body("mobileNumber")
    .trim()
    .notEmpty().withMessage("Mobile number is required")
    .matches(/^[0-9]{10}$/).withMessage("Invalid mobile number, must be 10 digits"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("location")
    .trim()
    .notEmpty().withMessage("Location is required"),

  body("level")
    .isArray().withMessage("Level must be an array")
    .custom((value) => {
      const allowedLevels = ["9th/10th Level", "11th/12th Level Medical", "11th/12th Level JEE"];
      const invalidLevels = value.filter(level => !allowedLevels.includes(level));
      if (invalidLevels.length > 0) {
        throw new Error(`Invalid level(s): ${invalidLevels.join(", ")}`);
      }
      return true;
    }),

  body("teachingSubjects")
    .notEmpty().withMessage("Teaching subjects are required")
    .custom(value => {
      if (typeof value !== "string" && !Array.isArray(value)) {
        throw new Error("Teaching subjects must be a string or an array");
      }
      return true;
    }),
];

module.exports = validateTeacherApplication;