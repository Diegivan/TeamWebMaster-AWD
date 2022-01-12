const express = require("express");
const router = express.Router();

const Client = require('../models/client');
const User = require('../models/user');
const ClientController = require('../controllers/clients');
const { isAuthenticated } = require('../helpers/auth');

//Client Uris
router.get('/admin/clients', isAuthenticated, ClientController.allClients)

module.exports = router;
