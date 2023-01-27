const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data)
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll();
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
    const customer = this.findOne(id);
    const response = await customer.update(changes)
    return response

  }

  async delete(id) {
    const customer =  this.findOne(id);
     await customer.destroy(customer);

    return { id };
  }
}

module.exports = CustomerService;
