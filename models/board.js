const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Methodology = require('./methodology');
const User = require('./user');

const boardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    methodology: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Methodology',
        unique: true,
    },
    springDuration: {
        type: Number,
        required: true,
    },
    actualSpringNumber: {
        type: Number,
        required: true,
    },
    maxSpringNumber: {
        type: Number,
        required: true,
    },
    member: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Methodology.role',
            required: true,
        }
    }],
    card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true,
    }]
});

boardSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Board', boardSchema);