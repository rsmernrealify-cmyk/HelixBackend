const express = require('express');
const upload = require('../config/multerConfig');
const { uploadFile } = require('../controllers/fileUploadController');

const router = express.Router();

// Route for file upload
router.get('/',(req,res)=>{
    res.send('files')
})
router.post('/syllabus', upload.single('file'), uploadFile);

module.exports = router;