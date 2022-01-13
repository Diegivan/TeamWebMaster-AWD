const express = require("express");

const Service = require('../models/Services');
const ServiceMethods = {};
// All admins
ServiceMethods.allServices = async (req, res) => {
    const service = await Service.find({})
        .lean()
        .catch((error) => res.json({ message: error}));    
    res.status(200).json({service});
}
//newService
ServiceMethods.newServices = async (req, res) => {
    const { name, description, price}=req.body;
    const NewServices = new Service({ name, description, price});
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
    const { name, description, price }=req.body;
    await Service.findByIdAndUpdate(req.params.id,{name, description, price})
    .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
}
ServiceMethods.deleteService = async (req, res) => {
    
    await Admin.findByIdAndDelete(req.params.id)
    .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
}
module.exports = ServiceMethods;