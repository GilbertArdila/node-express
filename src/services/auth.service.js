const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const nodemailer = require('nodemailer');



//verificamos la autenticación del usuario
class AuthService{
  async getUser(email,password){
    const user = await service.findByEmail(email);
    //si el usuario no existe enviamos el error
    if (!user) {
      throw(boom.unauthorized());
    }
    //verificamos el password
    const isMatch = await bcrypt.compare(password, user.password);
    //si el password no existe enviamos el error
    if (!isMatch) {
      throw(boom.unauthorized());
    }
    //no retornamos el password
    delete user.dataValues.password;
    return user
  }

  //firmamos el token del usuario
   singToken(user){
    //creamos un payload para el jwt
    const payload={
      sub: user.id,
      role: user.role
    };
    //creamos un token esto y el payload es la firma del token
    const token = jwt.sign(payload,config.jwtSecret)
    //retornamos el usuario y el token
    return{
      user,
      token
    };
  }
  async recoveryPassword(email){
    const user = await service.findByEmail(email);
    //si el usuario no existe enviamos el error
    if (!user) {
      throw(boom.unauthorized());
    };
    const payload = {sub : user.id};
    const token = jwt.sign(payload,config.jwtSecret,{expiresIn: '15min'});
    //debería ser la url con el endpoint de recuperación del frontend
    const link = `http://myfrontendurl/recovery?token=${token}`;
    //actualizamos el token de la bd
    await service.update(user.id,{recoveryToken:token});
    const mail = {
      from: config.mailAdress , // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recovery password link", // Subject line
      //text: "please follow the link below to recover your password", // plain text body
      html: `<p>please follow this <a>${link}</a> to recover your password</p>`, // html body
    }
    const response = await this.sendMail(mail);
    return response;
  }

  //servicio para enviar email de recuperación de contraseña
  async sendMail(infoMail){

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: config.mailAdress,
          pass: config.mailPassword
      }
    });

    await transporter.sendMail(infoMail);
    return {message:'mail sent'}
  }


}
module.exports = AuthService;
