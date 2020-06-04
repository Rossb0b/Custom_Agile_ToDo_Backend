const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        validate: (data) => {
            const hexadecimalRegex = new RegExp('^#([0-9a-f]{6}|[0-9a-f]{3})$');
            return hexadecimalRegex.test(data);
        },
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Label', labelSchema);