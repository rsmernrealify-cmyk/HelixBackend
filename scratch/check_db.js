const mongoose = require('mongoose');
const path = require('path');
const Course = require('./src/models/Course');
require('dotenv').config();

const MONGO_URI = "mongodb://localhost:27017/helix"; // Standard default, I'll check db.js to confirm

async function checkData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");
        const courses = await Course.find({});
        console.log("Found courses:", JSON.stringify(courses, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();
