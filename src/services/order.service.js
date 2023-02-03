const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }



  //hacemos está anidación para evitar un error al buscar todas las ordenes
  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    return orders
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
    return order;
  }

  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    if(!order){
      throw boom.notFound('order not found, please check the id');
    }
    const response = await order.update(changes)
    return response

  }

  async delete(id) {
    const order = await models.Order.findByPk(id);
    if(!order){
      throw boom.notFound('order not found, please check the id');
    }
     await order.destroy(order);

    return id ;
  }

  //creamos endpoint para buscar las ordenes de un usuario
  async findByUser(userId){
    const orders = await models.Order.findAll({
      where:{
        '$customer.user.id$': userId
      },
      include:[{
        association: 'customer',
        include:['user']
      }]
    });
    return orders
  }
    //create para items
    async addItem(data) {
      const newItem = await models.OrderProduct.create(data)
      return newItem;
    }


}

module.exports = OrderService;
