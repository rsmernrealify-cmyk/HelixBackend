const express = require('express');
const authRouter=require('./routes/authRoutes')
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth',authRouter)
// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Institute Website Backend API');
});

module.exports = app;