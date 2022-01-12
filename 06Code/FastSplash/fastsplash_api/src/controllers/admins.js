const express = require("express");

const Admin = require('../models/Admins');
const AdminMethods = {};
// All admins
AdminMethods.allAdmins = async (req, res) => {
    const admins = await Admin.find({})
        .lean()
        .catch((error) => res.json({ message: error}));    
    res.status(200).json({admins});
}

module.exports = AdminMethods;