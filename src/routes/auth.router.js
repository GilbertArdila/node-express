const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');

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
      //creamos un payload para el jwt
      const payload={
        sub: user.id,
        role: user.role
      };
      //creamos un token
      const token = jwt.sign(payload,config.jwtSecret)
      //retornamos el usuario y el token
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
