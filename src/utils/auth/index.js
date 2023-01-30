const passport = require('passport')
const localStrategy = require('./strategies/local.strategy');

passport.use(localStrategy);


//ojo se debe llamar en el index del root para que se ejecuten las estrategias
