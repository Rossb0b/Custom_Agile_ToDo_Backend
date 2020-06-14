const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategoryRule = require('./categoryRule');
const BoardPrerogative = require('./boardPrerogative');
const Label = require('./label');

const methodologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // category: [{
    //     name: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //     },
    //     rule: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'CategoryRule',
    //         required: true,
    //         unique: true,
    //     }],
    // }],
    role: [{
        name: {
            type: String,
            required: true,
            unique: true,
        },
        prerogative: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BoardPrerogative',
            required: true,
            unique: true,
        }]
    }],
    label: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
        required: true,
        unique: true,
    }]
});

methodologySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Methodology', methodologySchema);