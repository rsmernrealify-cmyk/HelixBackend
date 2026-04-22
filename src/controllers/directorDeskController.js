const DirectorDesk = require('../models/DirectorDesk');

// Get Director Desk Data (Always returns the first/latest entry)
const getDirectorDesk = async (req, res) => {
    try {
        const data = await DirectorDesk.findOne().sort({ createdAt: -1 });
        res.status(200).json(data || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create or Update Director Desk Data
const saveDirectorDesk = async (req, res) => {
    try {
        const { title, content, signature } = req.body;
        let contentArray = content;
        if (typeof content === 'string') {
            try {
                contentArray = JSON.parse(content);
            } catch (e) {
                contentArray = [content];
            }
        }

        // Filter out empty paragraphs
        if (Array.isArray(contentArray)) {
            contentArray = contentArray.filter(p => p && p.trim() !== "");
        }

        if (!title || !signature || !contentArray || contentArray.length === 0) {
            return res.status(400).json({ error: "Title, Signature, and at least one paragraph of message are required." });
        }

        let directorDesk = await DirectorDesk.findOne();
        let imageUrl = directorDesk ? directorDesk.image : "";

        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        if (directorDesk) {
            directorDesk.title = title || directorDesk.title;
            directorDesk.content = contentArray || directorDesk.content;
            directorDesk.signature = signature || directorDesk.signature;
            directorDesk.image = imageUrl;
            await directorDesk.save();
        } else {
            directorDesk = new DirectorDesk({
                title,
                content: contentArray,
                signature,
                image: imageUrl
            });
            await directorDesk.save();
        }

        res.status(200).json({ message: 'Director Desk updated successfully', directorDesk });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDirectorDesk,
    saveDirectorDesk
};
