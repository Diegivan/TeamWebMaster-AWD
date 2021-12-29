const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    rol: {
        type: String,
        required: true
    },    
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);