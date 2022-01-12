const express = require("express");
const { findById } = require("../models/client");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');
const { isAuthenticated } = require('../helpers/auth');

router.get('/admin/clients/new', isAuthenticated, (req, res) => {
    res.render('clients/newClient');
});

router.post('/clients/new',  isAuthenticated, async (req, res) => {
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
            }
            else {
                for (var i = 0; i < longCheck; i++) {
                    if (i == 0) {
                        let firstNumbers = parseInt(ci.charAt(i)) * 10 + parseInt(ci.charAt(i + 1));
                        if (firstNumbers >= 25) {
                            errors.push({ text: "La CI no corresponde a ninguna provincia" });
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
                } else {
                    errors.push({ text: "Debe ingresar una CI ecuatoriana" });
                }
            }
        }
        else {
            errors.push({ text: "La CI debe tener 10 dígitos" });
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
            req.flash('success_msg', 'Cliente agregado satisfactoriamente');
            res.redirect('/admin/clients');
        }
    };
});

router.get('/admin/clients',  isAuthenticated, async (req, res) => {
    const clients = await Client.find({}).lean();
    const users = await User.find({}).lean();
    res.render('clients/allClients', { clients, users });
});

router.get('/admin/clients/edit/:id',  isAuthenticated, async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    const user = await User.findById(client.userId).lean();
    console.log(client);
    res.render('clients/editClient', { client, user });
});

router.put('/clients/editClient/:id',  isAuthenticated, async (req, res) => {
    const { _id, firstName, lastName, ci, email, birthDate, userId, userName, actualPassword, password, confirmPassword, rol } = req.body;
    const user = await User.findById(userId).lean();
    console.log(user);
    console.log(user.password);
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
    if (!email) {
        errors.push({ text: 'Debe ingresar un email' });
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
    if (actualPassword) {
        const userTest = new User({ userName, password, rol });
        const match = await userTest.comparePassword (actualPassword, user.password); 
        if(match){
            if (!password) {
                errors.push({ text: 'Ingrese una nueva contraseña' });
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
        const userUser = await User.findOne({ userName: userName }).lean();
        const client = await Client.findById(req.params.id).lean();
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
                await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol}).lean();
            } else {
                const newUser = new User({ userName, password, rol });
                newUser.password = await newUser.encryptPassword(password);
                await User.findByIdAndUpdate(userId, {userName, password: newUser.password, rol}).lean();
            }
            //console.log(newUser)
            const newClient = new Client({ firstName, lastName, ci, email, birthDate, userId: _id });
            await Client.findByIdAndUpdate(req.params.id, { firstName, lastName, ci, email, birthDate, userId }).lean();
            req.flash('success_msg', 'Cliente modificado satisfactoriamente');
            res.redirect('/admin/clients');
        }
    };
});

router.delete('/admin/clients/delete/:id',  isAuthenticated, async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    await Client.findByIdAndDelete(req.params.id).lean();
    await User.findByIdAndDelete(client.userId).lean();
    req.flash('success_msg', 'Cliente eliminado satisfactoriamente');
    res.redirect('/admin/clients');
});


module.exports = router;