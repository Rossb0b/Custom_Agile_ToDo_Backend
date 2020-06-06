const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const OrganisationRole = require('./organisationRole');
const Methodology = require('./methodology');

const organisationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    member: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrganisationRole',
            required: true,
        },
    }],
    methdology: [{
        methodologyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Methodology',
            required: true,
            unique: true,
        }
    }],
    board: [{
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
            unique: true,
        }
    }],
});

organisationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Organisation', organisationSchema);