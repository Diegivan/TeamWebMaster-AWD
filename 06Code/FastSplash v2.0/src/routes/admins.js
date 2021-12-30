const express = require('express');
const router = express.Router();
const Admin = require('../models/Admins');
const User = require('../models/user');

router.get('/admin/add',(req, res) => {
    res.render('admins/new-admin');
});

router.post('/admin/new-admin',async(req, res) => {
    const { name, lastname, CI, userName, password, confirmPassword, rol}=req.body;
    const errors = [];
    if(!name){
        errors.push({text:'Ingrese nombre'});
    }
    if(!lastname){
        errors.push({text:'Ingrese apellido'});
    }
    if(!CI){
        errors.push({text:'Ingrese cedula'});
    }
    if(!userName){
        errors.push({text:'Ingrese nombre de usuario'});
    }
    if(!password){
        errors.push({text:'Ingrese contrasena'});
    }
    if (password != confirmPassword) {
        errors.push({ text: 'Error: Las contraseñas no coinciden' });
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
        await newUser.save();
        const { _id } = newUser;
        const NewAdmin = new Admin({ name, lastname, CI, userId: _id});
        await NewAdmin.save();
        
        res.redirect('/admin/admins')
    }
 });
router.get('/admin/admins',async(req, res) => {
     const admin = await Admin.find({}).lean();
     res.render('admins/all-admin',{ admin });
     
});
router.get('/admin/edit-admins/:id',async(req, res) => {
    const admin = await Admin.findById(req.params.id).lean();
    res.render('admins/edit-admins',{admin});
    
});
router.put('/admin/edit-admins/:id',async(req, res) => {
    const { name, lastname, CI}=req.body;
    await Admin.findByIdAndUpdate(req.params.id,{name, lastname, CI}).lean();
    req.flash('success_msg', 'Administrador editado satisfactoriamente');
    res.redirect('/admin/admins')
});
router.delete('/admin/delete/:id',async(req, res) => {
    await Admin.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Administrador eliminado satisfactoriamente');
    res.redirect('/admin/admins')
});
module.exports = router;