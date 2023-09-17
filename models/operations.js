const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    updateCount: {
        type: Number,
        default: 0,
    },
    deleteCount: {
        type: Number,
        default: 0,
    },
});

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;
