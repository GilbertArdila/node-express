const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    //usamos el alias que le dimos en user.model 'customer' para mostrar los datos anidados
    const clients = await models.User.findAll({
      include: ['customer']
    });
    // const client = await getConnection();
    // const response = await client.query('SELECT * FROM task');
    // return response.rows;
    return clients;

  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found, please check the id');
    }
    return { user };
  }

  async update(id, changes) {

    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found, please check the id');
    }
    const response = await user.update(changes);
    return response;

  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found, please check the id');
    }
     await user.destroy(user);

    return { id };
  }
}

module.exports = UserService;
