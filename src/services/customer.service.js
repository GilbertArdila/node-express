const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    //creamos el usuario en el mismo endpoint del customer usando la asociación y el alias del customer.model
    const newCustomer = await models.Customer.create(data,{
     include:['user']
    })
    return newCustomer;
  }

  async find() {
    //usamos el alias user del associate en  user.model para anidar la asociación entre tablas
    const customers = await models.Customer.findAll({
      include:['user']
    });
    return customers;

  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found, please check the id');
    }
    return { customer };
  }

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found, please check the id');
    }
    const response = await customer.update(changes)
    return response

  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found, please check the id');
    }
     await customer.destroy(customer);

    return { id };
  }
}

module.exports = CustomerService;
