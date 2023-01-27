const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    const clients = await models.User.findAll();
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
    const user = this.findOne(id);
    const response = await user.update(changes)
    return response

  }

  async delete(id) {
    const user =  this.findOne(id);
     await user.destroy(user);

    return { id };
  }
}

module.exports = UserService;
