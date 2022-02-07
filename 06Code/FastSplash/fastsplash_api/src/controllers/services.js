const { parse } = require("dotenv");
const express = require("express");

const Service = require('../models/Services');
const ServiceMethods = {};
const IVA=12;
// All admins
ServiceMethods.allServices = async (req, res) => {
    const service = await Service.find({})
        .lean()
        .catch((error) => res.json({ message: error}));    
    res.status(200).json({service});
}
//newService
ServiceMethods.newServices = async (req, res) => {
    var { name, description, price, discount}=req.body;
    price=parseFloat(price);
    console.log(price);
    if(4<=price)
    {
       price=price+(price*(IVA/100));

       console.log(price);
    }
    const NewServices = new Service({ name, description, price, discount});
    await NewServices.save()
    res.status(200).json({NewServices}); 
}
//editService
ServiceMethods.editServiceRender = async (req, res) => {
    const service = await Service.findById(req.params.id)
        .lean()
        .then((data) => res.json({service:data}))
        .catch((error) => res.json({ message: error}));
    
}
ServiceMethods.editService = async (req, res) => {
    var { name, description, price, discount }=req.body;
    price=parseFloat(price);
    if(4<=price)
    {
       price=price+(price*(IVA/100));
    }
    await Service.findByIdAndUpdate(req.params.id,{name, description, price, discount})
    .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
}
ServiceMethods.deleteService = async (req, res) => {
    
    await Service.findByIdAndDelete(req.params.id)
    .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
}
module.exports = ServiceMethods;