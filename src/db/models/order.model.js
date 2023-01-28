const {Model, DataTypes, Sequelize} = require('sequelize');
const {CUSTOMER_TABLE} = require('./customer.model');

const ORDER_TABLE = 'Orders';
const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  //un cliente muchas ordenes
  customerId:{
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      //se refiere a qué tabla se hace la relación y su primary key
     model: CUSTOMER_TABLE,
     key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  dispactched:{
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Order extends Model{
  static associate(models){
    //una orden un cliente
    this.belongsTo(models.Customer,{as:'customer'});

  }

  static config(sequelize){
     return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      //por defecto crea el updated_at y el created_at
      timestamps: false
     }
  }
};

module.exports = {ORDER_TABLE,OrderSchema,Order}
