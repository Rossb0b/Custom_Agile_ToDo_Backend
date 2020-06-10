const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = require('./user');

const notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    }
});

notificationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Notification', notificationSchema);