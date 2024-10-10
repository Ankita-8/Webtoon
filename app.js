require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

    const webtoonSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        characters: { type: [String], required: true },
    });
    
    const Webtoon = mongoose.model('Webtoon', webtoonSchema);
    
    // Validation schema
    const webtoonValidationSchema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        characters: Joi.array().items(Joi.string()).min(1).required()
    });
    
    // Middleware to verify JWT
    const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    // Split 'Bearer ' from the token
    const bearerToken = token.split(' ')[1];
    
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

    
    // Routes
    app.get('/webtoons', async (req, res) => {
        try {
            const webtoons = await Webtoon.find({});
            res.json(webtoons);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching webtoons' });
        }
    });
    
    app.post('/webtoons', authenticateToken, async (req, res) => {
        // Validate the incoming request body
        const { error } = webtoonValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
    
        const { title, description, characters } = req.body;
        try {
            const newWebtoon = new Webtoon({ title, description, characters });
            await newWebtoon.save(); // Save the new webtoon to the database
            res.status(201).json(newWebtoon);
        } catch (error) {
            res.status(500).json({ message: 'Error adding webtoon' });
        }
    });
    
    app.get('/webtoons/:id', async (req, res) => {
        try {
            const webtoon = await Webtoon.findById(req.params.id);
            if (!webtoon) {
                return res.status(404).json({ message: 'Webtoon not found' });
            }
            res.json(webtoon);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching webtoon' });
        }
    });
    
    app.delete('/webtoons/:id', authenticateToken, async (req, res) => {
        try {
            const deletedWebtoon = await Webtoon.findByIdAndDelete(req.params.id);
            if (!deletedWebtoon) {
                return res.status(404).json({ message: 'Webtoon not found' });
            }
            res.json({ message: 'Webtoon deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting webtoon' });
        }
    });
    
    // Login route to generate JWT
    app.post('/login', (req, res) => {
        const username = req.body.username; // Get username from request body
        const user = { name: username }; // Create a user object (for testing)
    
        // Generate a JWT token
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    });
    
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
