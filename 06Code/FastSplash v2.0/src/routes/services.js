const express = require('express');
const router = express.Router();
const Service = require('../models/Services');
router.get('/admin/services/add-service',(req, res) => {
    res.render('services/new-service');
});
router.post('/admin/new-services',async(req, res) => {
    const { name, description, price}=req.body;
    const errors = [];
    if(!name){
        
        errors.push({text:'Debe ingresar un nombre y tener mas de 5 caracteres'});
    }
    if(!description){
        errors.push({text:'Ingrese descripcion'});
    }
    if(!price || price<0){
        errors.push({text:'Debe ingresar precio y este deb ser mayor a cero'});
    }
    if(errors.length>0)
    {
        res.render('services/new-service',{
           errors,
           name,
           description,
           price
        })
    }
    else{
        const NewServices = new Service({ name, description, price});
        await NewServices.save();
        req.flash('success_msg', 'Servicio agregado satisfactoriamente');
        res.redirect('/admin/services')
    }
 });
router.get('/admin/services',async(req, res) => {
     const service = await Service.find({}).lean();
     res.render('services/all-service',{ service });
     
});

router.get('/admin/edit-services/:id',async(req, res) => {
    const service = await Service.findById(req.params.id).lean();
    res.render('services/edit-service',{service});
    
});
router.put('/services/edit-service/:id',async(req, res) => {
    const { name, description, price}=req.body;
    await Service.findByIdAndUpdate(req.params.id,{name, description, price}).lean();
    req.flash('success_msg', 'Servicio modificado satisfactoriamente');
    res.redirect('/admin/services')
});
router.delete('/admin/delete-service/:id',async(req, res) => {
    await Service.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Servicio eliminado satisfactoriamente');
    res.redirect('/admin/services')
});
module.exports = router;