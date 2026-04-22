const SalientFeature = require("../models/SalientFeature");

const getSalientFeatures = async (req, res) => {
  try {
    const features = await SalientFeature.find().sort({ createdAt: 1 });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSalientFeature = async (req, res) => {
  try {
    const { title } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title and Image are required" });
    }

    const feature = new SalientFeature({ title, image: imageUrl });
    await feature.save();
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSalientFeature = async (req, res) => {
  try {
    await SalientFeature.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feature deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSalientFeatures, addSalientFeature, deleteSalientFeature };
