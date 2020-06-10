const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const boardPrerogativeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});

boardPrerogativeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('BoardPrerogative', boardPrerogativeSchema);