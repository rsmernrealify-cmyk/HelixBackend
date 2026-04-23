const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const teacherApplicationRouter = require('./routes/teacherApplicationRoutes');
const testimonialRouter = require('./routes/testimonialRoutes');
const scholarshipTestRouter = require('./routes/scholarshipTestRoutes');
const sliderRouter = require('./routes/sliderRoutes');
const directorDeskRouter = require('./routes/directorDeskRoutes');
const courseRouter = require('./routes/courseRoutes');
const syllabusRouter = require('./routes/syllabusRoutes');
const answerKeyRouter = require('./routes/answerKeyRoutes');
const announcementRouter = require('./routes/announcementRoutes');
const sectionConfigRouter = require('./routes/sectionConfigRoutes');
const successStoryRouter = require('./routes/successStoryRoutes');
const salientFeatureRouter = require('./routes/salientFeatureRoutes');

const app = express();

/* ---------------- UPLOADS SETUP ---------------- */
const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

/* ---------------- CORS ---------------- */
app.use(cors({
    origin: [
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'https://lucent-cannoli-b5dbd4.netlify.app'
    ],
    credentials: true
}));

/* ---------------- STATIC FILES ---------------- */
app.use("/uploads", express.static(uploadPath));

/* ---------------- ROUTES ---------------- */
app.use('/auth', authRouter);
app.use('/file', fileRoutes);
app.use('/teacher', teacherApplicationRouter);
app.use('/testimonial', testimonialRouter);
app.use('/scholarship-test', scholarshipTestRouter);
app.use('/slider', sliderRouter);
app.use('/director-desk', directorDeskRouter);
app.use('/course', courseRouter);
app.use('/syllabus', syllabusRouter);
app.use('/answer-key', answerKeyRouter);
app.use('/announcement', announcementRouter);
app.use('/section-config', sectionConfigRouter);
app.use('/success-story', successStoryRouter);
app.use('/salient-feature', salientFeatureRouter);

/* ---------------- TEST ROUTES ---------------- */
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/', (req, res) => {
    res.send('Backend running fine 🚀');
});

module.exports = app;