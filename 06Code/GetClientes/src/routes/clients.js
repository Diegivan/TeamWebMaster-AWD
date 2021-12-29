const express = require("express");
const router = express.Router();

const Client = require('../models/client');

router.get('/admin/clients/new', (req, res) => {
    res.render('clients/newClient');
});

router.post('/clients/new', async (req, res) => {
    const { firstName, lastName, ci, email, birthDate } = req.body;
    const errors = [];
    if (!firstName) {
        errors.push({ text: 'Please insert your first name' });
    }
    if (!lastName) {
        errors.push({ text: 'Please insert your last name' });
    }
    if (!ci) {
        errors.push({ text: 'Please insert your ci' });
    }
    if (!email) {
        errors.push({ text: 'Please insert your email' });
    }
    if (!birthDate) {
        errors.push({ text: 'Please insert your date of birth' });
    }
    if (errors.length > 0) {
        res.render('clients/newClient', {
            errors,
            firstName,
            lastName,
            ci,
            email,
            birthDate
        });
    } else {
        const newClient = new Client({ firstName, lastName, ci, email, birthDate });
        await newClient.save();
        res.redirect('/admin/clients');
    };
});

router.get('/admin/clients', async (req, res) => {
    const clients = await Client.find({}).lean();
    res.render('clients/allClients', { clients });
});

router.get('/admin/clients/edit/:id', async (req, res) => {
    const client = await Client.findById(req.params.id).lean();
    res.render('clients/editClient', { client });
});

router.put('/clients/editClient/:id', async (req, res) => {
    const { firstName, lastName, ci, email, birthDate } = req.body;
    await Client.findByIdAndUpdate(req.params.id, { firstName, lastName, ci, email, birthDate }).lean();
    res.redirect('/admin/clients');
});

router.delete('/admin/clients/delete/:id', async (req, res) => {
    await Client.findByIdAndDelete(req.params.id).lean();
    res.redirect('/admin/clients');
});

module.exports = router;