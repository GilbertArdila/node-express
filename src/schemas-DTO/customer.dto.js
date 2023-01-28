const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const userId = Joi.number().integer();
//ateibutos para crear el user
const email = Joi.string().email();
const password =  Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  //creamos un objeto del usuario para crearlo en el mismo endpoint
  user: Joi.object({
  email: email.required(),
  password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});
const deleteCustomerSchema = Joi.object({
  id: id.required(),
});
module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema,deleteCustomerSchema };
