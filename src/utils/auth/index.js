const passport = require('passport')
const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);


//ojo se debe llamar en el index del root para que se ejecuten las estrategias
