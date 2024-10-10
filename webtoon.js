const mongoose = require('mongoose');

// Define the Webtoon schema
const webtoonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    characters: {
        type: [String], // Array of strings to hold character names
        required: true,
    }
});

// Create the Webtoon model
const Webtoon = mongoose.model('Webtoon', webtoonSchema);

module.exports = Webtoon;
