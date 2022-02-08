const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.comparePassword = async function(password, otherPassword) {
    return await bcrypt.compare(password, otherPassword);
};

module.exports = mongoose.model('User',userSchema);