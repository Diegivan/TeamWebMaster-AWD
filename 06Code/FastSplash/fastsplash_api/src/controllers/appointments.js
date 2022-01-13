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

const AppointmentMethods = {};

// All Apointments

AppointmentMethods.allAppointments =  async (req, res)=> {
    const services = await Service.find({})
        .lean()
        .catch((error) => res.json({ message: error}));

    res.status(200).json({services});
}

// User Appointment History

AppointmentMethods.historyAppointments = async (req, res) => {
    const appointment = await Appointment.find({})
        .lean()
        .catch((error) => res.json({ message: error}));
    const data = appointment;
    var dataReports = [];
    var j = 0;
    for(var i = 0; i < data.length; i++){
        if(data[i].Name===req.user.userName){
            dataReports[j]=data[i];
            j++
        }
    }
    res.status(200).json({dataReports});
}

module.exports = AppointmentMethods;