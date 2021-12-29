const { application } = require('express');
const express = require('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const { listen } = require('express/lib/application');
const methodOverride = require('method-override');
const session = require('express-session');
//initializations
const app = express();
require('./database');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');
//Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Global

//Routes
app.use(require('./routers/index'));
app.use(require('./routers/adminsFp'));
app.use(require('./routers/users'));
//Static files
app.use(express.static(path.join(__dirname,'public')));
//Server is listennig
app.listen(app.get('port'), () =>{
   console.log('Servidor en puerto',app.get('port'));
});




