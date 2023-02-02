const express = require('express');
const passport = require('passport');

const AuthService =  require('./../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.post(
  '/login',
  //autenticamos con login
  passport.authenticate('local',{session: false}),
  async (req, res, next) => {
    try {
      //obtenemos el usuario logeado
      //este es el usuario que nos envia local.strategy
      const user = req.user;
      //realizamos la firma del token
      res.json(service.singToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      //obtenemos el usuario logeado
      //este es el usuario que nos envia local.strategy
      const {email} = req.body;
      const response = await service.recoveryPassword(email);
      res.json(response);

    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
