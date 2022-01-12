const express = require("express");
const router = express.Router();
const passport = require('passport');

const Client = require('../models/client');
const User = require('../models/user');
const { isAuthenticated } = require('../helpers/auth');

/*router.get('/admin/users', isAuthenticated, async (req, res) => {
    const user = await User.find({}).lean();
    res.render('users/all-users', { user });

});*/

router.get('/login', (req, res) => {
    res.render('./users/login');
});

router.post('/login', passport.authenticate('local', {
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
        errors.push({ text: 'Debe ingresar su nombre' });
    } else {
        if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(firstName)) {
            errors.push({ text: 'El nombre solo puede contener letras' });
        }
    }
    if (!lastName) {
        errors.push({ text: 'Debe ingresar su apellido' });
    } else {
        if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(lastName)) {
            errors.push({ text: 'El apellido solo puede contener letras' });
        }
    }
    if (!ci) {
        errors.push({ text: 'Debe ingresar su cédula' });
    } else {
        var total = 0;
        var longitud = ci.length;
        var longCheck = longitud - 1;
        var message = "";
        var flag = false;

        if (ci !== "" && longitud == 10) {
            if (isNaN(ci)) {
                errors.push({ text: "La CI solo puede contener números" });
                flag = false;
            }
            else {
                for (var i = 0; i < longCheck; i++) {
                    if (i == 0) {
                        let firstNumbers = parseInt(ci.charAt(i)) * 10 + parseInt(ci.charAt(i + 1));
                        if (firstNumbers >= 25) {
                            errors.push({ text: "La CI no corresponde a ninguna provincia" });
                            flag = false;
                        }
                    }
                    if (i % 2 === 0) {
                        var aux = ci.charAt(i) * 2;
                        if (aux > 9) aux -= 9;
                        total += aux;
                    } else {
                        total += parseInt(ci.charAt(i));
                    }
                }

                total = total % 10 ? 10 - total % 10 : 0;

                if (ci.charAt(longitud - 1) == total) {
                    flag = true;
                } else {
                    errors.push({ text: "Debe ingresar una CI ecuatoriana" });
                    flag = false;
                }
            }
        }
        else {
            errors.push({ text: "La CI debe tener 10 dígitos" });
            flag = false;
        }
    }
    if (!email) {
        errors.push({ text: 'Debe ingresar su email' });
    } else {
        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            errors.push({ text: 'El email no sigue el formato: ejemplo@ej.ej' });
        }
    }
    if (!birthDate) {
        errors.push({ text: 'Debe ingresar su fecha de nacimiento' });
    } else {
        var today = new Date();
        var yyToday = today.getFullYear();

        var dateArr = birthDate.split("-");
        var yyDate = dateArr[0];
        if (!(((yyToday - yyDate) <= 100) && ((yyToday - yyDate) >= 18))) {
            errors.push({ text: 'No puede ingresar a una persona mayor a 100 años o menor a 18' });
        }
    }
    if (!userName) {
        errors.push({ text: 'Debe ingresar su nombre de usuario' });
    } else {
        if (!/^[a-zA-ZÀ-ÿ0-9-_]{1,20}$/.test(userName)) {
            errors.push({ text: 'El nombre de usuario solo puede contener caracteres alfanuméricos y _' });
        }
    }
    if (!password) {
        errors.push({ text: 'Debe ingresar una contraseña' });
    } else {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,16}$/.test(password)) {
            errors.push({ text: 'La contraseña debe tener mínimo una mayúscula, una minúscula y un número' });
            if (password.length < 8) {
                errors.push({ text: 'La contraseña debe ser mayor a 8 caracteres' });
            }
            if (password.length > 16) {
                errors.push({ text: 'La contraseña debe ser menor a 16 caracteres' });
            }
        } else {
            if (!confirmPassword) {
                errors.push({ text: 'Debe confirmar la contraseña' });
            } else {
                if (password != confirmPassword) {
                    errors.push({ text: 'Las contraseñas no coinciden' });
                }
            }
        }
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