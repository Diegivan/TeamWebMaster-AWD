const express = require('express');
const { render } = require('express/lib/response');
const Service = require('../models/Services');
const Appointment = require('../models/Appointments');
const router = express.Router();
const PDF = require('pdfkit-construct');
const fs = require ('fs');
const passport = require('passport')
const { isAuthenticated } = require('../helpers/auth');
const { ClientRequest } = require('http');




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

router.get('/admin/appointments',async(req, res) => {
    const appointment = await Appointment.find({}).lean();
    res.render('appointments/all-appointment',{ appointment });
});

router.get('/admin/edit-appointments/:id',async(req, res) => {
    const appointment = await Appointment.findById(req.params.id).lean();
    res.render('appointments/edit-appointment',{ appointment });
    
});
router.put('/appointments/edit-appointment/:id',async(req, res) => {
    const {Name, Plate, status}=req.body;
    await Appointment.findByIdAndUpdate(req.params.id,{Name, Plate, status}).lean();
    req.flash('success_msg', 'Cita modificado satisfactoriamente');
    res.redirect('/admin/appointments')
});

router.get('/get-factura/:id', async(req, res)=> {
    
    const appointment = await Appointment.findById(req.params.id).lean();
    const service = await Service.findById(req.params.id).lean();
    const doc = new PDF({bufferPage: true});
    const filename = `Factura${Date.now()}.pdf`;
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}`
    });

    doc.on('data', (data) => {stream.write(data)});
    doc.on('end', ()=>{stream.end()});

    const citas = [
       {
           Direccion: `${appointment.Adress}`,
           Referencia: `${appointment.Reference}`,
           Placa: `${appointment.Plate}`,
           Servicio: `${appointment.services}`,
           Hora: `${appointment.hours}`,
           Observacion: `${appointment.Obs}`,
        } 
    ];

    doc.setDocumentHeader({
        height: '16'
    }, ()=> {
        
        doc.fontSize(20).text('FACTURA DE SERVICIO FATSPLASH', {
            width: 420,
            align: 'center'
        });
    });
    doc.fontSize(20).text('FACTURA DE SERVICIO FATSPLASH', {
        width: 420,
        align: 'center'
    });
    doc.fontSize(12);

    doc.text(`Cliente: ${appointment.Name} `, {
        width: 420,
        align: 'left'
    });
    doc.text(`Direccion: ${appointment.Adress}`, {
        width: 420,
        align: 'left'
    });
    doc.text(`Placa: ${appointment.Plate} `, {
        width: 420,
        align: 'left'
    });
    doc.text(`Servicio: ${appointment.services} `, {
        width: 420,
        align: 'left'
    });
    doc.text(`Hora: ${appointment.hours} `, {
        width: 420,
        align: 'left'
    });
    doc.text(`Observacion: ${appointment.Obs} `, {
        width: 420,
        align: 'left'
    });

    doc.addTable([
        {key: 'Direccion', label: 'Direccion', align:'left'},
        {key: 'Referencia', label: 'Refrencia', align:'left'},
        {key: 'Placa', label: 'Placa', align:'left'},
        {key: 'Servicio', label: 'Servicio', align:'left'},
        {key: 'Hora', label: 'Hora', align:'left'},
        {key: 'Observacion', label: 'Observacion', align:'left'},

    ], citas, {
        
            border: null,
            width: "fill_body",
            striped: true,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 10,
            marginLeft: 45,
            marginRight: 45,
            headAlign: 'left'
    });

    doc.render();

    doc.end();

})

module.exports = router;