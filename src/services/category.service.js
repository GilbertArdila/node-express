const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(query) {
    //creamos las opciones para enviarle a la url
    const options = {};
    const { offset, limit } = query;
    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }
        //le enviamos las opciones

    const categories = await models.Category.findAll(options);
    return categories;
  }

  async findOne(id) {
    //nos retorna los productos de esa categoria, usamos el alias de la asociación en category.model
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('category not found, please check the id');
    }
    return  category ;
  }

  async update(id, changes) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('category not found, please check the id');
    }
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('category not found, please check the id');
    }
    await category.destroy(category);

    return  id ;
  }
}

module.exports = CategoryService;
