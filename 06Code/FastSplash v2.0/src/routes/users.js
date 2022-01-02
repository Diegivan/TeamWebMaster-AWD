const express = require("express");
const router = express.Router();
const passport = require('passport');

const Client = require('../models/client');
const User = require('../models/user');
const { isAuthenticated } = require('../helpers/auth');

router.get('/admin/users',  isAuthenticated, async(req, res) => {
    const user = await User.find({}).lean();
    res.render('users/all-users',{ user });
    
});

router.get('/login', (req, res) => {
    res.render('./users/login');
});

router.post('/login', passport.authenticate('local',  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', (req, res) => {
    res.render('./users/register');
});

// To recibe data
router.post('/register', async (req, res) => {
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
        res.render('users/register', {
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
            res.render('users/register', {
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
            req.flash('success_msg', 'Te has registrado correctamente');
            res.render('users/login', { userName, password });
        }
    };
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;