const express = require("express");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');
const ClientController = require('../controllers/clients');
const { isAuthenticated } = require('../helpers/auth');

//Client Uris
router.get('/admin/clients', isAuthenticated, ClientController.allClients)
//router.get('/admin/clients/new', isAuthenticated, ClientController.newClient); Esta no xd
router.get('/admin/clients/edit/:id', isAuthenticated, ClientController.getClient);


module.exports = router;
