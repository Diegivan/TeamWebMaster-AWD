const express = require("express");
const router = express.Router();
const passport = require('passport');

const Client = require('../models/client');
const User = require('../models/user');
const Admin = require('../models/Admins');
const Service = require('../models/Services');

const ClientController = require('../controllers/clients');
const AdminController = require('../controllers/admins');
const ServiceController = require('../controllers/services');
const UserController = require('../controllers/user');

const AppointmentController = require('../controllers/appointments');
const {  isAuthenticatedUser } = require('../helpers/auth');
const { loginAuthenticate } = require("../controllers/user");

//Client Uris
router.get('/admin/clients', ClientController.allClients);
router.get('/admin/clients/:id', ClientController.getClient);
router.get('/admin/clients/edit/:id', ClientController.getClient);
router.post('/clients/new',  ClientController.addClient);
router.put('/clients/editClient/:id',  ClientController.editClient);
router.delete('/admin/clients/delete/:id', ClientController.deleteClient);

//Admin Uris
router.get('/admin/admins',  AdminController.allAdmins);
router.get('/admin/admins/:id', AdminController.getAdmin);
router.post('/admin/new-admin',  AdminController.addAdmins);
router.get('/admin/edit-admins/:id',  AdminController.editAdminsRender);
router.put('/admin/edit-admins/:id', AdminController.editAdmin);
router.delete('/admin/delete/:id', AdminController.deleteAdmin);

//Services Uris
router.get('/admin/services', ServiceController.allServices);
router.post('/admin/new-services', ServiceController.newServices);
router.get('/admin/edit-services/:id',  ServiceController.editServiceRender);
router.put('/services/edit-service/:id',  ServiceController.editService);
router.delete('/admin/delete-service/:id',  ServiceController.deleteService);

//User Uris
router.get('/admin/users', UserController.allUsers);

// Appointment Uris
router.get('/appointment', AppointmentController.allAppointments);
router.get('/historial/appointments', AppointmentController.historyAppointments);
router.get('/admin/appointments',  AppointmentController.allAppointmentsUsers);
router.get('/admin/edit-appointments/:id',  AppointmentController.getAppointment);
router.get('/get-factura/:id', AppointmentController.getBill);
router.post('/appointment',  AppointmentController.addAppointment); 
router.put('/appointments/edit-appointment/:id', AppointmentController.editAppointment);
router.delete('/appointments/delete/:id',  AppointmentController.deleteAppointment);

// Login
router.post('/login', passport.authenticate('local'),
function(req, res) {
  res.status(200).json({message: "Logeado correctamente"});
});
router.post('/login/auth', UserController.loginAuthenticate);

// Register
router.post('/register', UserController.register);

// Logout
router.get('/logout',  UserController.logout);

module.exports = router;