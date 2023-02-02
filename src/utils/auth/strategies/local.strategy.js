const { Strategy } = require('passport-local');
const AuthService = require('./../../../services/auth.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new AuthService();

const localStrategy = new Strategy(
  {
    //le indicamos el nombre de los campos que requerimos, por defecto serían username y password, asé se deben enviar desde el frontend
    usernameField: 'email',
    passwordField: 'password',
  },
  //le enviamos los nombres de los campos requeridos que creamos arriba
  async (email, password, done) => {
    //verificamos cualquier error que se pueda producir con el try catch
    try {
      const user = await service.getUser(email,password)
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
