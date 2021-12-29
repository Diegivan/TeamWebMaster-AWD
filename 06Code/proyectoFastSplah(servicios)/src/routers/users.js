const express = require('express');
const router = express.Router();

router.get('/users/singin',(req, res) => {
    res.render('users/signin');
});
router.get('/',(req, res) => {
    res.render('users/signup');
});
module.exports = router;