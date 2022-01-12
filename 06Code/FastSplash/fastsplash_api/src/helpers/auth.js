const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Por favor inicie sesión');
    res.redirect('/login');
}

module.exports = helpers;