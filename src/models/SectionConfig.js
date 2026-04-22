const mongoose = require('mongoose');

const SectionConfigSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        unique: true
    },
    heading: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    // For sections with items like Categories, we can store them here too or use a separate model
    items: [{
        title: String,
        description: String,
        iconId: Number, // Reference to icon/color map
        link: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('SectionConfig', SectionConfigSchema);
