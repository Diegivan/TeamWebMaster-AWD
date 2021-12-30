const express = require("express");
const router = express.Router();
const User = require('../models/user');
router.get('/login',(req, res) => {
    res.render('./users/login');
});

router.get('/register',(req, res) => {
    res.render('./users/register');
});
//users-admin
router.get('/admin/users',async(req, res) => {
    const user = await User.find({}).lean();
    res.render('users/all-users',{ user });
    
});
// To recibe data
router.post('/register',(req, res) => {
    console.log(req.body);
    res.send('ok')
});

module.exports = router;