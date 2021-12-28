const express = require("express");
const router = express.Router();

router.get('/users/login',(req, res) => {
    res.render('./users/login');
});

router.get('/users/register',(req, res) => {
    res.render('./users/register');
});

module.exports = router;