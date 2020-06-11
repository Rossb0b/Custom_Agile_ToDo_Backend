const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MethodologyRole = require('./methodologyRole');
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
        required: true,
        unique: true,
    },
    sprintDuration: {
        type: Number,
        required: true,
    },
    actualSprintNumber: {
        type: Number,
        required: true,
    },
    maxSprintNumber: {
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
            ref: 'MethodologyRole',
            required: true,
        }
    }],
    card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }]
});

boardSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Board', boardSchema);