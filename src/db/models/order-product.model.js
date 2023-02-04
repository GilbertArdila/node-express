const {Model, DataTypes, Sequelize} = require('sequelize');
const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');


//esta es una tabla pivot, necesitamos el id de las dos tablas a las que enlaza, en este caso order y product
const ORDER_PRODUCT_TABLE = 'Orders_Products';
const OrderProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // la cantidad del producto
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId:{
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //no puede haber dos clientes con un mismo id de usuario
    references: {
      //se refiere a qué tabla se hace la relación y su primary key
     model: ORDER_TABLE,
     key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId:{
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //no puede haber dos clientes con un mismo id de usuario
    references: {
      //se refiere a qué tabla se hace la relación y su primary key
     model: PRODUCT_TABLE,
     key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class OrderProduct extends Model{
  static associate(models){
    //la orden tiene un usuario
    this.belongsTo(models.User,{as:'user'});
    //un cliente muchas ordenes de compra, ponemos la FK que está en order.model
    this.hasMany(models.Order,{
      as:'orders',
      foreignKey:'customerId'
    })

  }

  static config(sequelize){
     return{
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      //por defecto crea el updated_at y el created_at
      timestamps: false
     }
  }
};

module.exports = {ORDER_PRODUCT_TABLE,OrderProductSchema,OrderProduct}
