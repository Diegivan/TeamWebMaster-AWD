const express = require("express");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');
const Admin = require('../models/Admins');
const Service = require('../models/Services');
const ClientController = require('../controllers/clients');
const AdminController = require('../controllers/admins');
const ServiceController = require('../controllers/services')
const { isAuthenticated } = require('../helpers/auth');

//Client Uris
router.get('/admin/clients', isAuthenticated, ClientController.allClients)
//router.get('/admin/clients/new', isAuthenticated, ClientController.newClient); Esta no xd
router.get('/admin/clients/edit/:id', isAuthenticated, ClientController.getClient);

//Admin Uris
router.get('/admin/admins', isAuthenticated, AdminController.allAdmins)

//Services Uris
router.get('/admin/services',isAuthenticated, ServiceController.allServices);

//User Uris

module.exports = router;
