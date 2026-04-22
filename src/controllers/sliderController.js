const Slider = require('../models/Slider');

// Create a new slider
const createSlider = async (req, res) => {
    try {
        const { title, description, buttonText, link } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const slider = new Slider({
            title,
            description,
            image: imageUrl,
            buttonText,
            link
        });

        await slider.save();
        res.status(201).json({ message: 'Slider added successfully', slider });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all sliders
const getSliders = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json(sliders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a slider
const deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findByIdAndDelete(req.params.id);
        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.status(200).json({ message: 'Slider deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSlider,
    getSliders,
    deleteSlider
};
