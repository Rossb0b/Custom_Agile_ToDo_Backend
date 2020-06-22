const mongoose = require('mongoose');

const Board = require('./board');

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
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
});

module.exports = mongoose.model('Label', labelSchema);