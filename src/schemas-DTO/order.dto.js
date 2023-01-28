const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const dispactched = Joi.boolean();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  dispactched: dispactched
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  dispactched: dispactched
});

const getOrderSchema = Joi.object({
  id: id.required(),
});
const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema,deleteOrderSchema }
