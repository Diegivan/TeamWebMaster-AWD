const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated() && req.user.rol == 2) {
        return next();
    } else {
        if(!req.isAuthenticated()){
            req.flash('error', 'Por favor inicie sesión');
            res.status(401).json({message: "No ha iniciado sesión", code: "1"});
        } else if(req.user.rol != 2) {
            req.flash('error', 'Debe ingresar como un administrador para realizar esa acción');
            res.status(401).json({message: "Sesión no autorizada", code: "2"});
        }
    }
}

helpers.isAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated() && req.user.rol == 1) {
        return next();
    } else {
        if(!req.isAuthenticated()){
            req.flash('error', 'Por favor inicie sesión');
            res.status(401).json({message: "No ha iniciado sesión", code: "1"});
        } else if(req.user.rol != 1) {
            req.flash('error', 'Debe ingresar como cliente para realizar esa acción');
            res.status(401).json({message: "Sesión no autorizada", code: "2"});
        }
    }
}

module.exports = helpers;