const express = require("express");

const Client = require('../models/client');
const User = require('../models/user');

// All Clients
const allClients = async (req, res) => {
    const clients = await Client.find({})
        .lean()
        .catch((error) => res.json({ message: error}));

    const users = await User.find({})
        .lean()
        .catch((error) => res.json({ message: error}));
    
    res.status(200).json({clients, users});
}

module.exports = {allClients}