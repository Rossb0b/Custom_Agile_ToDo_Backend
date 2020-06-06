const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');
const OrganisationPrerogative = require('./organisationPrerogative');

const organisationRoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    prerogative: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrganisationPrerogative'
    }]
});

organisationRoleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('OrganisationRole', organisationRoleSchema);