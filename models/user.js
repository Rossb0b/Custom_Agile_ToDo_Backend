const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Organization = require('./organization');

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
    organization: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    }],
    image: {
      type: String,
      required: true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);