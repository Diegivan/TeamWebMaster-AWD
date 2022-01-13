const express = require("express");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');
const Admin = require('../models/Admins');
const Service = require('../models/Services');

const ClientController = require('../controllers/clients');
const AdminController = require('../controllers/admins');
const ServiceController = require('../controllers/services');
const UserController = require('../controllers/user');

const AppointmentController = require('../controllers/appointments');
const { isAuthenticated, isAuthenticatedUser } = require('../helpers/auth');

//Client Uris
router.get('/admin/clients', isAuthenticated, ClientController.allClients)
//router.get('/admin/clients/new', isAuthenticated, ClientController.newClient); Esta no xd
router.get('/admin/clients/edit/:id', isAuthenticated, ClientController.getClient);
router.post('/clients/new',  isAuthenticated, ClientController.addClient);
router.put('/clients/editClient/:id',  isAuthenticated, ClientController.editClient);
router.delete('/admin/clients/delete/:id', isAuthenticated, ClientController.deleteClient);

//Admin Uris
router.get('/admin/admins', isAuthenticated, AdminController.allAdmins);
router.post('/admin/new-admin', isAuthenticated, AdminController.addAdmins);
router.get('/admin/edit-admins/:id', isAuthenticated, AdminController.editAdminsRender);
router.put('/admin/edit-admins/:id', isAuthenticated, AdminController.editAdmin);
router.delete('/admin/delete/:id', isAuthenticated, AdminController.deleteAdmin);

//Services Uris
router.get('/admin/services',isAuthenticated, ServiceController.allServices);
router.post('/admin/new-services',isAuthenticated, ServiceController.newServices);
router.get('/admin/edit-services/:id', isAuthenticated, ServiceController.editServiceRender);
router.put('/services/edit-service/:id', isAuthenticated, ServiceController.editService);
router.delete('/admin/delete-service/:id', isAuthenticated, ServiceController.deleteService);

//User Uris
router.get('/admin/users',isAuthenticated, UserController.allUsers);
module.exports = router;

// Appointment Uris
router.get('/appointment', AppointmentController.allAppointments);
router.get('/historial/appointments', isAuthenticatedUser, AppointmentController.historyAppointments);
router.get('/admin/appointments', isAuthenticated, AppointmentController.allAppointmentsUsers);
router.get('/admin/edit-appointments/:id', isAuthenticated, AppointmentController.getAppointment);
router.get('/get-factura/:id', AppointmentController.getBill);
router.post('/appointment', isAuthenticated, AppointmentController.addAppointment); 
router.put('/appointments/edit-appointment/:id', AppointmentController.editAppointment);
router.delete('/appointments/delete/:id', isAuthenticated, AppointmentController.deleteAppointment);

// Login
router.post('/login', UserController.login);

// Register
router.post('/register', UserController.register);

// Logout
router.get('/logout',  UserController.logout);

module.exports = router;