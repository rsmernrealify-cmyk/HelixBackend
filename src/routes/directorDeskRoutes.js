const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { getDirectorDesk, saveDirectorDesk } = require("../controllers/directorDeskController");

router.get("/", getDirectorDesk);
router.post("/", upload.single("image"), saveDirectorDesk);

module.exports = router;
