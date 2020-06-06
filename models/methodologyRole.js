const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const BoardPrerogative = require('./boardPrerogative');
const Methodology = require('./methodology');

const methodologyRoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    prerogative: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardPrerogative'
    }],
    methdologyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Methodology',
        required: true,
        unique: true,
    },
});

methodologyRoleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('MethodologyRole', methodologyRoleSchema);