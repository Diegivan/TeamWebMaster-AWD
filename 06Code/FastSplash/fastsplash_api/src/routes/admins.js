const express = require('express');
const router = express.Router();
const Admin = require('../models/Admins');
const Service = require('../models/Services');
const Appointment = require('../models/Appointments');
const User = require('../models/user');
const { isAuthenticated } = require('../helpers/auth');
//ojito esto quitaran cuando ya hagan las vistas en react y las direcciones
/*router.get('/admin/add', isAuthenticated , (req, res) => {
    res.render('admins/new-admin');
});*/

/*router.post('/admin/new-admin', isAuthenticated , async(req, res) => {
    const { name, lastname, CI, userName, password, confirmPassword, rol}=req.body;
    const errors = [];

    if (!name) {
        errors.push({ text: 'Debe ingresar su nombre' });
    } else {
        if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(name)) {
            errors.push({ text: 'El nombre solo puede contener letras' });
        }
    }
    if (!lastname) {
        errors.push({ text: 'Debe ingresar su apellido' });
    } else {
        if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(lastname)) {
            errors.push({ text: 'El apellido solo puede contener letras' });
        }
    }
    if (!CI) {
        errors.push({ text: 'Debe ingresar su cédula' });
    } else {
        var total = 0;
        var longitud = CI.length;
        var longCheck = longitud - 1;
        var message = "";
        var flag = false;

        if (CI !== "" && longitud == 10) {
            if (isNaN(CI)) {
                errors.push({ text: "La CI solo puede contener números" });
            }
            else {
                for (var i = 0; i < longCheck; i++) {
                    if (i == 0) {
                        let firstNumbers = parseInt(CI.charAt(i)) * 10 + parseInt(CI.charAt(i + 1));
                        if (firstNumbers >= 25) {
                            errors.push({ text: "La CI no corresponde a ninguna provincia" });
                        }
                    }
                    if (i % 2 === 0) {
                        var aux = CI.charAt(i) * 2;
                        if (aux > 9) aux -= 9;
                        total += aux;
                    } else {
                        total += parseInt(CI.charAt(i));
                    }
                }

                total = total % 10 ? 10 - total % 10 : 0;

                if (CI.charAt(longitud - 1) == total) {
                } else {
                    errors.push({ text: "Debe ingresar una CI ecuatoriana" });
                }
            }
        }
        else {
            errors.push({ text: "La CI debe tener 10 dígitos" });
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
    if(errors.length>0)
    {
        res.render('admins/new-admin',{
           errors,
           name,
           lastname,
           CI,
           userName,
           password
        })
    }
    else{
        const newUser = new User({ userName, password, rol });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        const { _id } = newUser;
        const NewAdmin = new Admin({ name, lastname, CI, userId: _id});
        await NewAdmin.save();
        
        res.redirect('/admin/admins')
    }
 });
*/
/*router.get('/admin/edit-admins/:id', isAuthenticated , async(req, res) => {
    const admin = await Admin.findById(req.params.id).lean();
    res.render('admins/edit-admins',{admin});
    
});
router.put('/admin/edit-admins/:id', isAuthenticated , async(req, res) => {
    const { name, lastname, CI}=req.body;
    await Admin.findByIdAndUpdate(req.params.id,{name, lastname, CI}).lean();
    req.flash('success_msg', 'Administrador editado satisfactoriamente');
    res.redirect('/admin/admins')
});*/
/*
router.delete('/admin/delete/:id', isAuthenticated , async(req, res) => {
    await Admin.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Administrador eliminado satisfactoriamente');
    res.redirect('/admin/admins')
});
*/


module.exports = router;