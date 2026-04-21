const express = require('express');
const path=require('path')
const authRouter=require('./routes/authRoutes')
const fileRoutes = require('./routes/fileRoutes');
const teacherApplicationRouter=require('./routes/teacherApplicationRoutes')
const testimonialRouter=require('./routes/testimonialRoutes')
const scholarshipTestRouter=require('./routes/scholarshipTestRoutes')
const cors=require('cors')
const app = express();

app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://c516sfpc-5173.inc1.devtunnels.ms'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
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
// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Institute Website Backend API');
});

module.exports = app;