const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
    try {
        console.log("Creating/Updating course with body:", req.body); // CRITICAL DEBUG LOG
        const { 
            name, category, categoryId, description, instructor, lessons, students, 
            duration, price, hoverDescription, isPopular,
            eligible, startDates, mode, admissionCriteria, longDescription,
            scholarshipDetails, registrationStepsOnline, registrationStepsOffline, formLink,
            intensity, modulesCount, popularityRanking, noteForApplicants
        } = req.body;
        
        console.log("Incoming req.body keys:", Object.keys(req.body)); 
        
        let imageUrl = "";
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const courseData = {
            ...req.body,
            image: imageUrl || req.body.image
        };

        // Ensure numbers and booleans are correctly parsed if they come as strings
        if (typeof courseData.lessons === 'string') courseData.lessons = parseInt(courseData.lessons) || 0;
        if (typeof courseData.students === 'string') courseData.students = parseInt(courseData.students) || 0;
        if (typeof courseData.categoryId === 'string') courseData.categoryId = parseInt(courseData.categoryId) || 0;
        if (courseData.isPopular === 'true') courseData.isPopular = true;
        if (courseData.isPopular === 'false') courseData.isPopular = false;

        const course = new Course(courseData);
        await course.save();
        res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const { categoryId, isPopular } = req.query;
        let query = {};
        if (categoryId) query.categoryId = categoryId;
        if (isPopular) query.isPopular = isPopular === 'true';

        const courses = await Course.find(query);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        // Ensure numbers and booleans are correctly parsed if they come as strings
        if (typeof updateData.lessons === 'string') updateData.lessons = parseInt(updateData.lessons) || 0;
        if (typeof updateData.students === 'string') updateData.students = parseInt(updateData.students) || 0;
        if (typeof updateData.categoryId === 'string') updateData.categoryId = parseInt(updateData.categoryId) || 0;
        if (updateData.isPopular === 'true') updateData.isPopular = true;
        if (updateData.isPopular === 'false') updateData.isPopular = false;

        const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
