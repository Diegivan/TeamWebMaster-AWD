const express = require('express');
//const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Initializations
const app = express();
const port = process.env.PORT || 8085;
require('./database');

// Settings
app.set('port', port);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middleware
/*app.use(express.json());
app.use(clientRoutes);*/
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//routes
app.use(require("./routes/clients"));
app.use(require("./routes/users"));
app.use(require("./routes/index"));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//mongodb connection
/*mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));
*/
app.listen(port, () => console.log('Server listening on port', port,'\nhttp://localhost:'+port)); 

