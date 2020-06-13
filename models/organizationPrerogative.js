const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const organizationPrerogativeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
        unique: true
    }
});

organizationPrerogativeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('OrganizationPrerogative', organizationPrerogativeSchema);