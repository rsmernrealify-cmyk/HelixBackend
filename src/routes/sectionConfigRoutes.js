const express = require("express");
const router = express.Router();
const { getSectionConfig, updateSectionConfig } = require("../controllers/sectionConfigController");

router.get("/:sectionName", getSectionConfig);
router.post("/", updateSectionConfig);

module.exports = router;
