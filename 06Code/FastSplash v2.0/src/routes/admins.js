const express = require('express');
const router = express.Router();
const Admin = require('../models/Admins');

router.get('/admin/add',(req, res) => {
    res.render('admins/new-admin');
});

router.post('/admin/new-admin',async(req, res) => {
    const { name, lastname, CI, username, password}=req.body;
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
    if(!username){
        errors.push({text:'Ingrese nombre de usuario'});
    }
    if(!password){
        errors.push({text:'Ingrese contrasena'});
    }
    if(errors.length>0)
    {
        res.render('admins/new-admin',{
           errors,
           name,
           lastname,
           CI,
           username,
           password
        })
    }
    else{
        const NewAdmin = new Admin({ name, lastname, CI, username, password});
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
    const { name, lastname, CI, username, password}=req.body;
    await Admin.findByIdAndUpdate(req.params.id,{name, lastname, CI, username, password}).lean();;
    res.redirect('/admin/admins')
});
router.delete('/admin/delete/:id',async(req, res) => {
    await Admin.findByIdAndDelete(req.params.id).lean();
    res.redirect('/admin/admins')
});
module.exports = router;