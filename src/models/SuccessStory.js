const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);
