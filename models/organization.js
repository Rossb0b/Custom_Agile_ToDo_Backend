const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const OrganizationRole = require('./organizationRole');
const Methodology = require('./methodology');

const organizationSchema = mongoose.Schema({
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
            ref: 'OrganizationRole',
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

organizationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Organization', organizationSchema);