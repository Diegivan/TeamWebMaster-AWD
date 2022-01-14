const express = require("express");
const passport = require('passport');

const User = require('../models/user');
const Client = require('../models/client');
const UserMethods = {};
// All admins
UserMethods.allUsers = async (req, res) => {
    const users = await User.find({})
        .lean()
        .catch((error) => res.json({ message: error }));
    res.status(200).json({ users });
}

// Login
UserMethods.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

UserMethods.loginAuthenticate = async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName }).lean();
    if(user){
        const newUser = new User({ userName: user.userName, password: user.password, rol: user.rol });
        const match = await newUser.comparePassword(req.body.password, user.password);
        if (match) {
            res.status(200).json({actualUser: newUser});
        } else {
            res.status(400).json({error: "Contraseña Incorrecta"});
        }
    } else {
        res.status(400).json({error: "No se encontró al usuario"});
    }
}

// Register 
UserMethods.register = async (req, res) => {
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

// Logout
UserMethods.logout = (req, res) => {
    req.logOut();
    res.status(200).json({ message: "Logout exitoso" });
}

module.exports = UserMethods;