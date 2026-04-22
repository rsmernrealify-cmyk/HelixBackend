const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  uploadAnswerKey,
  getAnswerKeys,
  deleteAnswerKey,
} = require("../controllers/answerKeyControllers");

// Upload Answer Key (Name + Question Paper PDF + Answer Key PDF)
router.post(
  "/",
  upload.fields([
    { name: "questionPaper", maxCount: 1 },
    { name: "answerKey", maxCount: 1 },
  ]),
  uploadAnswerKey
);

// Get All Answer Keys
router.get("/", getAnswerKeys);

// Delete Answer Key
router.delete("/:id", deleteAnswerKey);

module.exports = router;
