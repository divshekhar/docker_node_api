const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        max: 100,
    },
    author: {
        type: String,
        required: true,
        max: 20,
    },
    created_on: {
        type: Date,
        required: true,
    },
    updated_on: {
        type: Date,
    },
});

module.exports = mongoose.model('Post', PostSchema);