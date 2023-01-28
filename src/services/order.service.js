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
    //anidamos los datos del cliente y a la vez nos traemos los datos de usuario de ese cliente
    const order = await models.Order.findByPk(id,{
      include: [{
        association:'customer',
        include:['user']
        //incluimos lis items de esa orden
      },'items']
    });
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

    //create para items
    async addItem(data) {
      const newItem = await models.OrderProduct.create(data)
      return newItem;
    }


}

module.exports = OrderService;
