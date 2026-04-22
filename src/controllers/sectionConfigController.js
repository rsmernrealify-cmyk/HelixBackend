const SectionConfig = require("../models/SectionConfig");

// Get config for a specific section
const getSectionConfig = async (req, res) => {
  try {
    const config = await SectionConfig.findOne({ sectionName: req.params.sectionName });
    if (!config) {
      return res.status(404).json({ message: "Config not found" });
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update or create config
const updateSectionConfig = async (req, res) => {
  const { sectionName, heading, subheading, items } = req.body;
  try {
    let config = await SectionConfig.findOne({ sectionName });
    if (config) {
      config.heading = heading;
      config.subheading = subheading;
      if (items) config.items = items;
      await config.save();
    } else {
      config = new SectionConfig({ sectionName, heading, subheading, items });
      await config.save();
    }
    res.status(200).json({ message: "Section config updated successfully", config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSectionConfig, updateSectionConfig };
