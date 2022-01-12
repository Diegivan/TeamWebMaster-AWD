const express = require("express");

const Client = require('../models/client');
const User = require('../models/user');

const ClientMethods = {};

// All Clients
ClientMethods.allClients = async (req, res) => {
    const clients = await Client.find({})
        .lean()
        .catch((error) => res.json({ message: error}));

    const users = await User.find({})
        .lean()
        .catch((error) => res.json({ message: error}));
    
    res.status(200).json({clients, users});
}

// Add New Client
ClientMethods.newClient = (req, res) => {
    res.render('clients/newClient');
}

module.exports = ClientMethods;