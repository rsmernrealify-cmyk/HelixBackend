const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { name, category, categoryId, description, instructor, lessons, students, duration, price, hoverDescription, isPopular } = req.body;
        
        let imageUrl = "";
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const course = new Course({
            name,
            category,
            categoryId,
            description,
            instructor,
            lessons,
            students,
            duration,
            price,
            hoverDescription,
            image: imageUrl,
            isPopular
        });

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
