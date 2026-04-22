const express = require("express");
const router = express.Router();
const { getSalientFeatures, addSalientFeature, deleteSalientFeature } = require("../controllers/salientFeatureController");
const upload = require("../config/multerConfig");

router.get("/", getSalientFeatures);
router.post("/", upload.single("image"), addSalientFeature);
router.delete("/:id", deleteSalientFeature);

module.exports = router;
