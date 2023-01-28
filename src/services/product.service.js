const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    };
    const { limit, offset } = query;
    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
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
    const product = this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = this.findOne(id);
    await product.destroy(product);

    return { id };
  }
}

module.exports = ProductService;
