const express = require('express');
const authRouter=require('./routes/authRoutes')
const app = express();

app.use(express.json());

app.use('/auth',authRouter)
// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Institute Website Backend API');
});

module.exports = app;