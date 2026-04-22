const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createSyllabus, getSyllabus, deleteSyllabus } = require("../controllers/syllabusController");

router.post("/", (req, res, next) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, createSyllabus);
router.get("/", getSyllabus);
router.delete("/:id", deleteSyllabus);

module.exports = router;
