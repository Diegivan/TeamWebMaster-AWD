const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated() && req.user.rol == 2) {
        return next();
    } else {
        if(!req.isAuthenticated()){
            req.flash('error', 'Por favor inicie sesión');
            res.redirect('http://localhost:3000/login');
        } else if(req.user.rol != 2) {
            req.flash('error', 'Debe ingresar como un administrador para realizar esa acción');
            res.redirect('http://localhost:3000/');
        }
    }
}

helpers.isAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated() && req.user.rol == 1) {
        return next();
    } else {
        if(!req.isAuthenticated()){
            req.flash('error', 'Por favor inicie sesión');
            res.redirect('http://localhost:3000/login');
        } else if(req.user.rol != 1) {
            req.flash('error', 'Debe ingresar como cliente para realizar esa acción');
            res.redirect('http://localhost:3000/');
        }
    }
}

module.exports = helpers;