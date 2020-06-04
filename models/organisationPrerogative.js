const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const organisationPrerogativeSchema = mongoose.Schema({
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

organisationPrerogativeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('OrganisationPrerogative', organisationPrerogativeSchema);