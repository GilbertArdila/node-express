const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const price = Joi.number().integer();
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();


const createProductSchema = Joi.object({
   name: name.required(),
   price: price.required(),
   image:image.required(),
   description: description.required(),
   categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
 id:id.required()
});

const deleteProductSchema = Joi.object({
  id:id.required()
 });

 module.exports = {createProductSchema,updateProductSchema,getProductSchema,deleteProductSchema}
