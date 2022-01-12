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

// Add New (No vale)
ClientMethods.newClient = (req, res) => {
    res.render('clients/newClient');
}

// Get Client
ClientMethods.getClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error}));

    const user = await User.findById(client.userId)
        .lean()
        .catch((error) => res.json({ message: error}));

    res.status(200).json({client, user});
}

module.exports = ClientMethods;