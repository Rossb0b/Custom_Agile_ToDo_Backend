const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const OrganisationPrerogative = require('./organisationPrerogative');

const organisationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    roles: [{
        name: {
            type: String,
            required: true,
            unique: true,
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        prerogatives: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrganisationPrerogative'
        }]
    }],
});

organisationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Organisation', organisationSchema);