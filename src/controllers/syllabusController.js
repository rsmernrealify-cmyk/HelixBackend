const Syllabus = require('../models/Syllabus');

// Create a new syllabus
const createSyllabus = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Syllabus file is required' });
        }
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const syllabus = new Syllabus({
            title,
            category,
            fileUrl
        });

        await syllabus.save();
        res.status(201).json({ message: 'Syllabus uploaded successfully', syllabus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all syllabus
const getSyllabus = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) query.category = category;

        const syllabus = await Syllabus.find(query);
        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a syllabus
const deleteSyllabus = async (req, res) => {
    try {
        const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
        if (!syllabus) return res.status(404).json({ error: 'Syllabus not found' });
        res.status(200).json({ message: 'Syllabus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSyllabus,
    getSyllabus,
    deleteSyllabus
};
