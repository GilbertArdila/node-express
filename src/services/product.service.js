const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { models } = require('./../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    // const query = 'SELECT * FROM tasks';
    // const [data] = await sequelize.query(query);
    // return data;
    const products = await models.Product.findAll();
    return products;
  }

  async findOne(id) {
    // const product = this.products.find(item => item.id === id);
    // if (!product) {
    //   throw boom.notFound('product not found');
    // }
    // if (product.isBlock) {
    //   throw boom.conflict('product is block');
    // }
    // return product;
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found, please check the id');
    }
    return { product };
  }

  async update(id, changes) {
    // const index = this.products.findIndex(item => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes
    // };
    // return this.products[index];
    const product = this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    //   const index = this.products.findIndex(item => item.id === id);
    //   if (index === -1) {
    //     throw boom.notFound('product not found');
    //   }
    //   this.products.splice(index, 1);
    //   return { id };
    // }
    const product = this.findOne(id);
    await product.destroy(product);
    return { id };
  }
}
module.exports = ProductsService;
