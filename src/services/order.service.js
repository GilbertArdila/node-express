const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;

  }

  async findOne(id) {
    const order = await models.Order.findByPk(id);
    if(!order){
      throw boom.notFound('order not found, please check the id');
    }
    return { order };
  }

  async update(id, changes) {
    const order = this.findOne(id);
    const response = await order.update(changes)
    return response

  }

  async delete(id) {
    const order =  this.findOne(id);
     await order.destroy(order);

    return { id };
  }

}

module.exports = OrderService;
