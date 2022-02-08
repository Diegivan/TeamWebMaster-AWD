const express = require('express');
const { render } = require('express/lib/response');
const Service = require('../models/Services');
const Appointment = require('../models/Appointments');
const router = express.Router();
const PDF = require('pdfkit-construct');
const fs = require('fs');
const passport = require('passport')
const { isAuthenticated } = require('../helpers/auth');
const { ClientRequest } = require('http');

const AppointmentMethods = {};

// All Apointments 
AppointmentMethods.allAppointments = async (req, res) => {
    const services = await Service.find({})
        .lean()
        .then((data) => res.json({ services: data }))
        .catch((error) => res.json({ message: error }));
}

// User Appointment History
AppointmentMethods.historyAppointments = async (req, res) => {
    const appointment = await Appointment.find({})
        .lean()
        .catch((error) => res.json({ message: error }));
    const data = appointment;
    var dataReports = [];
    var j = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].Name === req.user.userName) {
            dataReports[j] = data[i];
            j++
        }
    }
    res.status(200).json({ dataReports });
}

AppointmentMethods.historialAppointments = async (req, res) => {
    const appointments = await Appointment.find({Name: req.params.id})
        .lean()
        .catch((error) => console.log(error));

    const services = await Service.find({})
        .lean()
        .catch((error) => console.log(error));

    res.status(200).json({ appointments, services });
}

// All Appointments from Admin
AppointmentMethods.allAppointmentsUsers = async (req, res) => {
    const appointments = await Appointment.find({})
        .lean()
        .catch((error) => res.json({ message: error }));

    const services = await Service.find({})
        .lean()
        .catch((error) => res.json({ message: error }));

    res.status(200).json({ appointments, services });
}

// Get a single Appointment 
AppointmentMethods.getAppointment = async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
        .lean()
        .then((data) => res.json({ appointment: data }))
        .catch((error) => res.json({ message: error }));

}

// Get bill
AppointmentMethods.getBill = async (req, res) => {

    const appointment = await Appointment.findById(req.params.id)
        .lean()
        .catch((error) => console.log(error));
    const service = await Service.findById(appointment.services)
        .lean()
        .catch((error) => console.log(error));
    const doc = new PDF({ bufferPage: true });
    const filename = `Factura${Date.now()}.pdf`;
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}`
    });

    doc.on('data', (data) => { stream.write(data) });
    doc.on('end', () => { stream.end() });

    const citas = [
        {
            Direccion: `${appointment.Adress}`,
            Referencia: `${appointment.Reference}`,
            Placa: `${appointment.Plate}`,
            Servicio: `${service.name}`,
            Hora: `${appointment.hours}`,
            Observacion: `${appointment.Obs}`,
        }
    ];

    doc.setDocumentHeader({
        height: '16'
    }, () => {

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
    doc.text(`Servicio: ${service.name} `, {
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
    doc.text(`Precio: ${service.price} `, {
        width: 420,
        align: 'left'
    });

    doc.addTable([
        { key: 'Direccion', label: 'Direccion', align: 'left' },
        { key: 'Referencia', label: 'Refrencia', align: 'left' },
        { key: 'Placa', label: 'Placa', align: 'left' },
        { key: 'Servicio', label: 'Servicio', align: 'left' },
        { key: 'Hora', label: 'Hora', align: 'left' },
        { key: 'Observacion', label: 'Observacion', align: 'left' },
        { key: 'Precio', label: 'Precio', align: 'left' }
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

    res.status(200).json({ appointment, service });
}

// Create Appointment
AppointmentMethods.addAppointment = async (req, res) => {
    const { Name, Adress, Reference, Date, Plate, cars, services, hours, status, Obs } = req.body;
    const NewAppointment = new Appointment({ Name, Adress, Reference: Reference || Reference != ''? Reference : "Ninguna", Date, Plate, cars, services, hours, status, Obs: Obs || Obs != '' ? Obs : "Ninguna"});
    await NewAppointment.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

// Edit Appointment
AppointmentMethods.editAppointment = async (req, res) => {
    const { status } = req.body;
    await Appointment.findByIdAndUpdate(req.params.id, { status })
        .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

AppointmentMethods.deleteAppointment = async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id)
        .lean()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

module.exports = AppointmentMethods;