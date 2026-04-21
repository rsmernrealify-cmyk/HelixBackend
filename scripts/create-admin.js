const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../src/models/Admin');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    const name = 'Admin User';
    const email = 'admin@helix.com';
    const password = 'Admin@123';

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB.');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log(`Admin with email ${email} already exists.`);
            process.exit(0);
        }

        // Hash the password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // Save admin
        await newAdmin.save();
        console.log('-----------------------------------');
        console.log('Admin account created successfully!');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('-----------------------------------');
        console.log('IMPORTANT: Please change this password after your first login.');

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

createAdmin();
