const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Organisation = require('./organisation');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    organisation: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Organisation,
      required: true
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);