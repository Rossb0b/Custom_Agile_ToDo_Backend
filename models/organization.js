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
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        hasCustomRole: {
            type: Boolean,
        }
    }],
    role: [{
        name: {
            type: String,
        },
        prerogativeId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrganizationPrerogative',
        }]
    }],
    methodology: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Methodology',
    }],
    board: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
    }],
    lastActivity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    }
});

organizationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Organization', organizationSchema);