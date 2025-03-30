const User = require("../models/User");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = new User({ name, email, password });
        await user.save(); // This triggers the pre('save') hook to hash the password

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateToken();
        const { password: _, ...userData } = user._doc;
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use `true` in production
            sameSite: 'strict', // Ensures cookie is sent in the same-origin requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

const CheckAuth = async (req, res) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in database
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = { signup, login, CheckAuth, logout };
