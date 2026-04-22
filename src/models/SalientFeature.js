const mongoose = require('mongoose');

const SalientFeatureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SalientFeature', SalientFeatureSchema);
