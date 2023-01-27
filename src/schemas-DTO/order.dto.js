const Joi = require('joi');

const id = Joi.number().integer();
const id_customer = Joi.number().integer();
const dispactched = Joi.boolean();

const createOrderSchema = Joi.object({
  id_customer: id_customer.required(),
  dispactched: dispactched.required()
});

const updateOrderSchema = Joi.object({
  id_customer: id_customer,
  dispactched: dispactched
});

const getOrderSchema = Joi.object({
  id: id.required(),
});
const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema,deleteOrderSchema }
