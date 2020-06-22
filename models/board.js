const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MethodologyRole = require('./methodologyRole');
const Methodology = require('./methodology');
const Label = require('./label');
const Card = require('./card');
const User = require('./user');
const Organization = require('./organization');

const boardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    methodology: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Methodology',
        required: false,
    },
    label: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
        required: false,
    }],
    list: [{
        name: {
            type: String,
        },
        card: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
        }],
        // rule: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'CategoryRule',
        //     required: true,
        // }],
    }],
    sprintDuration: {
        type: Number,
        required: false,
    },
    actualSprintNumber: {
        type: Number,
        required: false,
    },
    maxSprintNumber: {
        type: Number,
        required: false,
    },
    member: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MethodologyRole',
        }
    }],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
});

module.exports = mongoose.model('Board', boardSchema);