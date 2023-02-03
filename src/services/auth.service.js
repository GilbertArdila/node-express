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
    //delete user.dataValues.recoveryPassword;
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }
  async recoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.mailAdress,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      console.log(user)
      if (user.recoveryToken !== token) {
        console.log(user)
        throw boom.unauthorized();

      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
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
