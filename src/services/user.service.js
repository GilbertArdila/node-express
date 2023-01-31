const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {}

  async create(data) {
    //encriptamos el password del usuario
    const hash = await bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    //para no retornar el password en la respuesta, por seguridad
    delete newUser.dataValues.password;
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

  //buscar por email
  async findByEmail(email) {
    //el email es unique, solo hay uno en la db
    const response = await models.User.findOne({
      where:{email}
    });
    return response;
  };

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
