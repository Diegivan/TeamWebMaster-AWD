const express = require('express');
//const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const cors = require('cors')

// Initializations
const app = express();
const port = process.env.PORT || 3027;
require('./database');
require('./config/passport');

// Settings
app.set('port', port);

//middleware
/*app.use(express.json());
app.use(clientRoutes);*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//routes
app.use(require('./routes/uris'));

//mongodb connection
app.listen(port, () => console.log('Server listening on port', port));