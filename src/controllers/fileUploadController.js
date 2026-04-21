const path = require('path');

// File upload logic
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: 'File uploaded successfully.',
      fileName: req.file.filename,
      filePath,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile };
