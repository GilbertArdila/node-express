const {Strategy} = require('passport-local');
const UserService =  require('./../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service =new UserService();
const localStrategy = new Strategy({
  //le indicamos el nombre de los campos que requerimos, por defecto serían username y password
  usernameField: 'email',
  passwordField: 'password'
},
  async (email,password,done) => {
  //verificamos cualquier error que se pueda producir con el try catch
  try {
    //buscamos el usuario por email
    const user = await service.findByEmail(email);
    //si el usuario no existe enviamos el error
    if(!user){
      done(boom.unauthorized(),false);
    }
    //verificamos el password
    const isMatch = await bcrypt.compare(password,user.password);
    //si el password no existe enviamos el error
    if(!isMatch){
      done(boom.unauthorized(),false);
    }
    //no retornamos el password
    delete user.dataValues.password;
    //si hay usuario y el password corresponde enviamos los datos del usuario
    done(null,user);
  } catch (error) {
    done(error,false)
  }

});

module.exports = localStrategy;
