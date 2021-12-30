const express = require("express");
const { findById } = require("../models/client");
const router = express.Router();

const Client = require('../models/client');
const user = require("../models/user");
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
    if (!password) {
        errors.push({ text: 'Error: Debe ingresar una contraseña' });
    }
    if (!confirmPassword) {
        errors.push({ text: 'Error: Debe confirmar la contraseña' });
    }
    if (password != confirmPassword) {
        errors.push({ text: 'Error: Las contraseñas no coinciden' });
    }
    if (password.length < 8) {
        errors.push({ text: 'Error: La contraseña debe ser mayor a 8 caracteres' });
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
            confirmPassword
        });
    } else {
        const userUser = await User.findOne({ userName: userName }).lean();
        const ciClient = await Client.findOne({ ci: ci }).lean();
        if (userUser || ciClient) {
            if (userUser) {
                errors.push({ text: 'El usuario ingresado ya existe' });
            }
            if (ciClient) {
                errors.push({ text: 'Ya está registrada una persona con esa cédula' });
            }
            res.render('clients/newClient', {
                errors,
                firstName,
                lastName,
                ci,
                email,
                birthDate,
                userName,
                password,
                confirmPassword
            });
        } else {
            const newUser = new User({ userName, password, rol });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();

            const { _id } = newUser;
            const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
            await newClient.save();
            res.redirect('/admin/clients');
        }
        req.flash('success_msg', 'Cliente agregado satisfactoriamente');
    };
});

router.get('/admin/clients', async (req, res) => {
    const clients = await Client.find({}).lean();
    const users = await User.find({}).lean();
    res.render('clients/allClients', { clients, users });
});

router.get('/admin/clients/edit/:id', async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    const user = await User.findById(client.userId).lean();
    res.render('clients/editClient', { client, user });
});

router.put('/clients/editClient/:id', async (req, res) => {
    const { _id, firstName, lastName, ci, email, birthDate, userId, userName, actualPassword, password, confirmPassword, rol } = req.body;
    const user = await User.findById(userId).lean();
    console.log(user);
    console.log(user.password);
    const errors = [];
    if (!firstName) {
        errors.push({ text: 'El nombre no puede quedar vacio' });
    }
    if (!lastName) {
        errors.push({ text: 'El apellido no puede quedar vacio' });
    }
    if (!email) {
        errors.push({ text: 'El email no puede quedar vacio' });
    }
    if (!birthDate) {
        errors.push({ text: 'La fecha de nacimiento no puede quedar vacia' });
    }
    if (!userName) {
        errors.push({ text: 'El usuario no puede quedar vacio' });
    }
    if (actualPassword) {
        const userTest = new User({ userName, password, rol });
        const match = await userTest.comparePassword (actualPassword, user.password); 
        console.log('actual: '+actualPassword+' antigua: '+user.password+ ' match: '+ match);
        if(match){
            if (!confirmPassword) {
                errors.push({ text: 'Debe confirmar la nueva contraseña' });
            }
            if (password != confirmPassword) {
                errors.push({ text: 'Las nuevas contraseñas no coinciden' });
            }
            if (password.length < 8) {
                errors.push({ text: 'La contraseña nueva debe ser mayor a 8 caracteres' });
            }
        } else {
            errors.push({ text: 'La contraseña actual es incorrecta' });
        }        
    }   
    if (errors.length > 0) {
        const client = await Client.findById(req.params.id).lean();
        res.render('clients/editClient', { client, user,
            errors, 
            firstName,
            lastName,
            ci,
            email,
            birthDate,
            userId,
            userName,
            password,
            confirmPassword
        });
    } else {
        console.log(userName);
        const userUser = await User.findOne({ userName: userName }).lean();
        const client = await Client.findById(req.params.id).lean();
        console.log(userUser)
        if (userUser && userUser._id != userId) {
            errors.push({ text: 'El usuario ingresado ya existe' });            
            res.render('clients/editClient', { client, user,
                errors,
                firstName,
                lastName,
                ci,
                email,
                birthDate,
                userId,
                userName,
                password,
                confirmPassword
            });
        } else {
            if(!actualPassword){
                const newUser = new User({ userName, password: user.password, rol });
                console.log('password '+ user.password)
                await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol}).lean();
                console.log(newUser) 
            } else {
                const newUser = new User({ userName, password, rol });
                console.log(newUser)
                newUser.password = await newUser.encryptPassword(password);
                await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol}).lean();
                console.log(newUser) 
            }
            //console.log(newUser)
            const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
            await Client.findByIdAndUpdate(req.params.id, { firstName, lastName, ci, email, birthDate, userId }).lean();
            req.flash('success_msg', 'Cliente modificado satisfactoriamente');
            res.redirect('/admin/clients');
            console.log(newClient)
        }
    };
});

router.delete('/admin/clients/delete/:id', async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    await Client.findByIdAndDelete(req.params.id).lean();
    await User.findByIdAndDelete(client.userId).lean();
    req.flash('success_msg', 'Cliente eliminado satisfactoriamente');
    res.redirect('/admin/clients');
});


module.exports = router;