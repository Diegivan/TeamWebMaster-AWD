const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'userName'
}, async (userName, password, done) => {
    const user = await User.findOne({userName: userName}).lean();
    if(!user) {
        return done(null, false, { message: 'No se encontró al usuario'});
    } else {
        console.log(password)
        const newUser = new User({userName: user.userName, password: user.password, rol: user.rol});
        const match = await newUser.comparePassword(password, user.password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña Incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    }).lean();
});