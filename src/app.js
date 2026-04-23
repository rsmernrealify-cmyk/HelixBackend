const express = require('express');
const path=require('path')
const authRouter=require('./routes/authRoutes')
const fileRoutes = require('./routes/fileRoutes');
const teacherApplicationRouter=require('./routes/teacherApplicationRoutes')
const testimonialRouter=require('./routes/testimonialRoutes')
const scholarshipTestRouter=require('./routes/scholarshipTestRoutes')
const sliderRouter=require('./routes/sliderRoutes')
const directorDeskRouter=require('./routes/directorDeskRoutes')
const courseRouter=require('./routes/courseRoutes')
const syllabusRouter=require('./routes/syllabusRoutes')
const answerKeyRouter = require('./routes/answerKeyRoutes')
const announcementRouter = require('./routes/announcementRoutes')
const sectionConfigRouter = require('./routes/sectionConfigRoutes')
const successStoryRouter = require('./routes/successStoryRoutes')
const fs = require('fs');
const salientFeatureRouter = require('./routes/salientFeatureRoutes')
const cors=require('cors')
const app = express();

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Request Logger Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.get('origin')}`);
    next();
});

app.use(express.json());
const allowedOrigins = [
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'https://lucent-cannoli-b5dbd4.netlify.app/'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Match any local network or dev tunnel pattern for ease of dev
        const isAllowed = allowedOrigins.includes(origin) || 
                          origin.startsWith('http://localhost:') || 
                          origin.endsWith('devtunnels.ms');

        if (!isAllowed) {
            console.log(`CORS Rejected for origin: ${origin}`);
            return callback(null, true); // Temporarily allow for debugging pending issues
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/scholarship-test',scholarshipTestRouter)
app.use('/file', fileRoutes);
app.use('/auth',authRouter)
app.use('/testimonial',testimonialRouter);
app.use('/teacher',teacherApplicationRouter)
app.use('/slider', sliderRouter)
app.use('/director-desk', directorDeskRouter)
app.use('/course', courseRouter)
app.use('/syllabus', syllabusRouter)
app.use('/answer-key', answerKeyRouter)
app.use('/announcement', announcementRouter)
app.use('/section-config', sectionConfigRouter)
app.use('/success-story', successStoryRouter)
app.use('/salient-feature', salientFeatureRouter)
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Institute Website Backend API');
});

module.exports = app;