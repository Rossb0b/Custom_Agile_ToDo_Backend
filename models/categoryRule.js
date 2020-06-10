const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categoryRuleSchema = mongoose.Schema({
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

categoryRuleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('CategoryRule', categoryRuleSchema);