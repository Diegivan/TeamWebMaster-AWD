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

// Add Client
ClientMethods.addClient = async (req, res) => {
    const { firstName, lastName, ci, email, birthDate, userName, password, confirmPassword, rol } = req.body;
    const userUser = await User.findOne({ userName: userName }).lean();
    const ciClient = await Client.findOne({ ci: ci }).lean();
    const error = [];
    if (userUser || ciClient) {
        if (userUser) {
            error.push({ message: 'El usuario ingresado ya existe' });
        }
        if (ciClient) {
            error.push({ message: 'Ya está registrada una persona con esa cédula' });
        }
        res.status(400).json({error, user: userUser, client: ciClient})
    } else {
        const newUser = new User({ userName, password, rol });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save()
            .catch((error) => res.json({ message: error }));

        const { _id } = newUser;
        const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
        await newClient.save()
            .catch((error) => res.json({ message: error }));

        res.status(200).json({newUser, newClient});
    }
}

ClientMethods.editClient = async (req, res) => {
    const { _id, firstName, lastName, ci, email, birthDate, userId, userName, actualPassword, password, confirmPassword, rol } = req.body;
    const user = await User.findById(userId)
        .lean()
        .catch((error) => res.json({ message: error }));
    const userUser = await User.findOne({ userName: userName }).lean();
    const client = await Client.findById(req.params.id).lean();
    const error = [];
    if (userUser && userUser._id != userId) {
        error.push({ message: 'El usuario ingresado ya existe' });   
        res.status(400).json({error, user: userUser, client: client})        
    } else {
        if (actualPassword) {
            const userTest = new User({ userName, password, rol });
            const match = await userTest.comparePassword (actualPassword, user.password); 
            if(!match){
                error.push({ message: 'La contraseña actual es incorrecta' });
                return res.status(400).json({error, user: userUser, client: client})
            }        
        }  
        if(!actualPassword){
            var newUser = new User({ userName, password: user.password, rol });
            await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol})
                .lean()
                .catch((error) => res.json({ message: error }));
        } else {
            var newUser = new User({ userName, password, rol });
            newUser.password = await newUser.encryptPassword(password);
            await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol})
                .lean()
                .catch((error) => res.json({ message: error }));
        }
        const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
        await Client.findByIdAndUpdate(req.params.id, { firstName, lastName, ci, email, birthDate, userId })
            .lean()
            .catch((error) => res.json({ message: error }));
        
        res.status(200).json({newUser, newClient});
    }
}

ClientMethods.deleteClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error }));
    await Client.findByIdAndDelete(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error }));
    await User.findByIdAndDelete(client.userId)
        .lean()
        .catch((error) => res.json({ message: error }));

    res.status(200).json({message: "Eliminado Correctamente"});
}

module.exports = ClientMethods;