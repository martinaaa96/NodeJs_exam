const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: 'Invalid platform'
        },
        required: true
    },
    boughtBy: {
        type: [],
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',

    },

})