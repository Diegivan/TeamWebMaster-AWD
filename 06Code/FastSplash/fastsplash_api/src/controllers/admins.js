const express = require("express");
const User = require('../models/user');
const Admin = require('../models/Admins');
const AdminMethods = {};

// All admins
AdminMethods.allAdmins = async (req, res) => {
    const admins = await Admin.find({})
        .lean()
        .catch((error) => res.json({ message: error }));
    res.status(200).json({ admins });
}

// All admins
AdminMethods.getAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error }));
        
    if (admin) {
        const user = await User.findById(admin.userId)
            .lean()
            .catch((error) => res.json({ message: error }));
        res.status(200).json({ admin, user });
    } else {
        res.status(404).json({ message: "No se encontró el admin solicitado" });
    }
}

// add admins
AdminMethods.addAdmins = async (req, res) => {
    const { name, lastname, CI, userName, password, confirmPassword, rol } = req.body;
    const newUser = new User({ userName, password, rol });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save()
        .catch((error) => res.json({ message: error }));
    const { _id } = newUser;
    const NewAdmin = new Admin({ name, lastname, CI, userId: _id });
    await NewAdmin.save()
        .catch((error) => res.json({ message: error }));
    res.status(200).json({ newUser, NewAdmin });
}
//editadminsRender
AdminMethods.editAdminsRender = async (req, res) => {
    const admin = await Admin.findById(req.params.id)
        .lean()
        .then((data) => res.json({ admin: data }))
        .catch((error) => res.json({ message: error }));

}
AdminMethods.editAdmin = async (req, res) => {
    const { name, lastname, CI } = req.body;
    await Admin.findByIdAndUpdate(req.params.id, { name, lastname, CI })
        .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
AdminMethods.deleteAdmin = async (req, res) => {

    const admin = await Admin.findById(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error }));
    await Admin.findByIdAndDelete(req.params.id)
        .lean()
        .catch((error) => res.json({ message: error }));
    await User.findByIdAndDelete(admin.userId)
        .lean()
        .catch((error) => res.json({ message: error }));
    res.status(200).json({ message: "eliminado" });

}
module.exports = AdminMethods;