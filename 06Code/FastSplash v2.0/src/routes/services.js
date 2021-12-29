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
        errors.push({text:'Ingrese nombre'});
    }
    if(!description){
        errors.push({text:'Ingrese descripcion'});
    }
    if(!price){
        errors.push({text:'Ingrese precio'});
    }
    if(errors.length>0)
    {
        res.render('services/all-service',{
           name,
           description,
           price
        })
    }
    else{
        const NewServices = new Service({ name, description, price});
        await NewServices.save();
        
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
    res.redirect('/admin/services')
});
router.delete('/admin/delete-service/:id',async(req, res) => {
    await Service.findByIdAndDelete(req.params.id).lean();
    res.redirect('/admin/services')
});
module.exports = router;