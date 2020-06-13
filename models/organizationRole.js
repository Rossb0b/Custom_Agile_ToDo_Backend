const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const OrganizationPrerogative = require('./organizationPrerogative');

const organizationRoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    prerogativeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrganizationPrerogative'
    }]
});

organizationRoleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('OrganizationRole', organizationRoleSchema);