const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    ci: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Client',clientSchema);