const express = require("express");
const router = express.Router();
const Service = require('../models/Services');

router.get('/',(req, res) => {
    res.render('index');
});

router.get('/about',(req, res) => {
    res.render('about');
});
router.get('/services', async(req, res) => {
    const services = await Service .find({}).lean();
    res.render('services',{ services });
    
});
module.exports = router;