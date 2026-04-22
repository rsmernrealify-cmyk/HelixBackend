const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");

router.post("/", upload.single("image"), createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload.single("image"), updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
