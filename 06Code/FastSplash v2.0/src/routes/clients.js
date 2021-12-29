const express = require("express");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');

router.get('/admin/clients/new', (req, res) => {
    res.render('clients/newClient');
});

router.post('/clients/new', async (req, res) => {
    const { firstName, lastName, ci, email, birthDate, userName, password, confirmPassword, rol } = req.body;
    const errors = [];
    if (!firstName) {
        errors.push({ text: 'Error: Debe ingresar su nombre' });
    }
    if (!lastName) {
        errors.push({ text: 'Error: Debe ingresar su apellido' });
    }
    if (!ci) {
        errors.push({ text: 'Error: Debe ingresar su cédula' });
    }
    if (!email) {
        errors.push({ text: 'Error: Debe ingresar su email' });
    }
    if (!birthDate) {
        errors.push({ text: 'Error: Debe ingresar su fecha de nacimiento' });
    }
    if (!userName) {
        errors.push({ text: 'Error: Debe ingresar su nombre de usuario' });
    }
    if (!password || !confirmPassword) {
        errors.push({ text: 'Error: Debe ingresar una contraseña' });
    }
    if (password != confirmPassword) {
        errors.push({ text: 'Error: Las contraseñas no coinciden' });
    }
    if (errors.length > 0) {
        res.render('clients/newClient', {
            errors,
            firstName,
            lastName,
            ci,
            email,
            birthDate,
            userName,
            password,
            rol
        });
    } else {
        const newUser = new User({ userName, password, rol });
        await newUser.save();
        const { _id } = newUser;
        const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
        await newClient.save();
        req.flash('success_msg', 'Cliente agregado satisfactoriamente');
        res.redirect('/admin/clients');
    };
});

router.get('/admin/clients', async (req, res) => {
    const clients = await Client.find({}).lean();
    const users = await User.find({}).lean();
    res.render('clients/allClients', { clients, users });
});

router.get('/admin/clients/edit/:id', async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    res.render('clients/editClient', { client });
});

router.put('/clients/editClient/:id', async (req, res) => {
    const { firstName, lastName, ci, email, birthDate } = req.body;
    await Client.findByIdAndUpdate(req.params.id, { firstName, lastName, ci, email, birthDate }).lean();
    req.flash('success_msg', 'Cliente modificado satisfactoriamente');
    res.redirect('/admin/clients');
});

router.delete('/admin/clients/delete/:id', async (req, res) => {
    await Client.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Cliente eliminado satisfactoriamente');
    res.redirect('/admin/clients');
});

module.exports = router;