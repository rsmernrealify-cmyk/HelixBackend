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
const cors=require('cors')
const app = express();

// Request Logger Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.get('origin')}`);
    next();
});

app.use(express.json());
const allowedOrigins = [
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'https://c516sfpc-5174.inc1.devtunnels.ms/'
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
// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Institute Website Backend API');
});

module.exports = app;