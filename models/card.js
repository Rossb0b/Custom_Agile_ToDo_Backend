const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Methodology = require('./methodology');
const User = require('./user');
const Board = require('./board');

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: false,
    },
    value: {
        type: Number,
        required: false,
    },
    comment: [{
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    }],
    worker: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    label: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
        required: false,
    }],
    list: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

cardSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Card', cardSchema);