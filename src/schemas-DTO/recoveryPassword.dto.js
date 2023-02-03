const Joi = require('joi');

const token = Joi.string();
const newPassword = Joi.string().min(4).max(8);

const createNewPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
});

module.exports = {createNewPasswordSchema}
