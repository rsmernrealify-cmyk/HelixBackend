const express = require("express");
const router = express.Router();
const {createApplication,getApplications,getApplicationById,deleteApplication} = require("../controllers/teacherApplicationController");
const upload = require("../config/multerConfig"); // Import your existing Multer config
const validateTeacherApplication=require('../validations/validateTeacherApplication')

router.get("/",(req,res)=>{
    res.send('hello teacher')
})
// Route to submit a new application (with file upload)
router.post("/apply", upload.single("resume"),validateTeacherApplication, createApplication);

// Route to get all applications (admin access)
router.get("/applications", getApplications);

// Route to get a single application by ID (admin access)
router.get("/applications/:id", getApplicationById);

// Route to delete an application (admin access)
router.delete("/applications/:id", deleteApplication);

module.exports = router;
