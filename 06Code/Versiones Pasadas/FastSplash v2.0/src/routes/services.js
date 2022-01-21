const express = require('express');
const router = express.Router();
const Service = require('../models/Services');
const IVA=12;
router.get('/admin/services/add-service',isAuthenticated , (req, res) => {
    res.render('services/new-service');
});
router.post('/admin/new-services',isAuthenticated , async(req, res) => {
    var { name, description, price, discount}=req.body;
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
    price=parseFloat(price);
    console.log(price);
    if(4<=price)
    {
       price=price+(price*(IVA/100));

       console.log(price);
    }
    price=price-(price*(discount/100));
        const NewServices = new Service({ name, description, price, discount});
        await NewServices.save();
        req.flash('success_msg', 'Servicio agregado satisfactoriamente');
        res.redirect('/admin/services')
    }
 });
router.get('/admin/services',isAuthenticated , async(req, res) => {
     const service = await Service.find({}).lean();
     res.render('services/all-service',{ service });
     
});

router.get('/admin/edit-services/:id',isAuthenticated , async(req, res) => {
    const service = await Service.findById(req.params.id).lean();
    res.render('services/edit-service',{ service });
    
});
router.put('/services/edit-service/:id',isAuthenticated , async(req, res) => {
    var { name, description, price, discount}=req.body;
    await Service.findByIdAndUpdate(req.params.id,{name, description, price}).lean();
    req.flash('success_msg', 'Servicio modificado satisfactoriamente');
    res.redirect('/admin/services')
});
router.delete('/admin/delete-service/:id',isAuthenticated , async(req, res) => {
    await Service.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Servicio eliminado satisfactoriamente');
    res.redirect('/admin/services')
});
module.exports = router;