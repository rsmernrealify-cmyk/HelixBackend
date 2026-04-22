const mongoose = require("mongoose");

const AnswerKeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questionPaperUrl: {
    type: String,
    required: true,
  },
  answerKeyUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AnswerKey", AnswerKeySchema);
