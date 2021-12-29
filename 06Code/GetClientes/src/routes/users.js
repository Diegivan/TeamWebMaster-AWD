const express = require("express");
const router = express.Router();

router.get('/login',(req, res) => {
    res.render('./users/login');
});

router.get('/register',(req, res) => {
    res.render('./users/register');
});

// To recibe data
router.post('/register',(req, res) => {
    console.log(req.body);
    res.send('ok')
});

module.exports = router;