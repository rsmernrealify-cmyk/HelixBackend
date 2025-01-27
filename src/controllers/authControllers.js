const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use the email service you prefer
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Admin registration
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation to ensure that all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new admin
        await newAdmin.save();

        // Send success response
        return res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Admin login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find Admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ AdminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token in response
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find Admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Generate reset password token
        const resetToken = jwt.sign({ AdminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Construct reset link
        // const resetLink = `/reset-password/${resetToken}`;

        // Send email with reset link
        const mailOptions = {
            from: process.env.EMAIL_Admin,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. <h1>Reset Token ${resetToken} </h1> Click <a href="">here</a> to reset your password.</p>`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find Admin by ID
        const Admin = await Admin.findById(decoded.AdminId);
        if (!Admin) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update Admin's password
        Admin.password = hashedPassword;
        await Admin.save();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports={
    register,
    login,
    forgotPassword,
    resetPassword
}
