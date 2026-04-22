const app = require('./app');
const PORT = 3000;

// Start the server immediately so the tunnel doesn't time out
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Then initialize other things
const connectDB = require('./config/db');
require('dotenv').config(); 

// Connect to DB in the background
connectDB();