const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const {Op} = require('sequelize');
class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    //retornamos la categoria del producto usando el alias de la asociación del product.model

    const options = {
      include: ['category'],
      where:{}
    };
    const { limit, offset,price,name,price_max,price_min } = query;
    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }
    //buscar por precio
    if(price){
      options.where.price = price
    }
    if(name){
      options.where.name = name
    }
    //validamos rango de precio
    if(price_max && price_min){
      options.where.price = {
        [Op.gte]:price_min,
        [Op.lte]:price_max
      }
    }
    //le enviamos las opciones
    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found, please check the id');
    }
    return { product };
  }

  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found, please check the id');
    }
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found, please check the id');
    }
    await product.destroy(product);

    return { id };
  }
}

module.exports = ProductService;
