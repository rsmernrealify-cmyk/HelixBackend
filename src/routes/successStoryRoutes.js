const express = require("express");
const router = express.Router();
const { getSuccessStories, addSuccessStory, deleteSuccessStory } = require("../controllers/successStoryController");

router.get("/", getSuccessStories);
router.post("/", addSuccessStory);
router.delete("/:id", deleteSuccessStory);

module.exports = router;
