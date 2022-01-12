const express = require("express");

const Service = require('../models/Services');
const ServiceMethods = {};
// All admins
ServiceMethods.allServices = async (req, res) => {
    const service = await Service.find({})
        .lean()
        .catch((error) => res.json({ message: error}));    
    res.status(200).json({service});
}
module.exports = ServiceMethods;