const express = require('express');
const { render } = require('express/lib/response');
const Services = require('../models/Services');
const Appointment = require('../models/Appointments');
const router = express.Router();
const passport = require('passport')
const { isAuthenticated } = require('../helpers/auth');




router.get('/appointment', async(req, res)=> {
    const services = await Services.find({}).lean();
    res.render('appointments/new-appointments', {services});
})

router.get('/index', (req, res)=> {
   res.render('index');
})

router.post('/appointment',async(req, res) => {
    const {Name, Adress, Reference, Date, Plate, cars, services, hours, status, Obs }=req.body;
    const errors = [];
    if(!Adress){
        
        errors.push({text:'Please enter your address'});
    }
    if(!Reference){
        
        errors.push({text:'Please enter your reference of your home'});
    }
    if(!Date){
        errors.push({text:'Enter a date for your appointment'});
    }
    if(!Plate){
        errors.push({text:'Please enter your plate'});
    }
    if(!cars){
        errors.push({text:'Please enter your model car'});
    }
    if(!services){
        errors.push({text:'Please select the service that you want'});
    }
    if(!hours){
        errors.push({text:'Please select an horary'});
    }
    if(!Obs){
        errors.push({text:'Please enter observation'});
    }
    if(errors.length>0)
    {
        res.render('appointments/new-appointment',{
           errors,
           Name,
           Adress,
           Reference,
           Date ,
           Plate,
           cars,
           services,
           hours, 
           status,
           Obs
        })
    }
    else{
        //services = JSON.stringify(services);
        const NewAppointment = new Appointment({Name, Adress, Reference, Date, Plate, cars, services, hours, status, Obs});
        await NewAppointment.save();
        req.flash('success_msg', 'Cita creada satisfactoriamente');
        res.redirect('/index')
    }
 });

 router.get('/historial/appointments',async(req, res) => {
    const appointment = await Appointment.find({}).lean();
    res.render('appointments/all-appointment',{ appointment });
});

module.exports = router;