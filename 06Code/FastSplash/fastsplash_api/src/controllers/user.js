const express = require("express");

const User = require('../models/user');
const UserMethods = {};
// All admins
UserMethods.allUsers = async (req, res) => {
    const users = await User.find({})
        .lean()
        .catch((error) => res.json({ message: error}));    
    res.status(200).json({users});
}

module.exports = UserMethods;