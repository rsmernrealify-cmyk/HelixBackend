const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createSlider, getSliders, deleteSlider } = require("../controllers/sliderController");

router.post("/", upload.single("image"), createSlider);
router.get("/", getSliders);
router.delete("/:id", deleteSlider);

module.exports = router;
