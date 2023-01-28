const {Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model')

const CUSTOMER_TABLE = 'Customers';
const CustomerSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName:{
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING
  },
  phone:{
    allowNull: false,
    type: DataTypes.STRING

  },
  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //no puede haber dos clientes con un mismo id de usuario
    unique: true,
    references: {
      //se refiere a qué tabla se hace la relación y su primary key
     model: USER_TABLE,
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

class Customer extends Model{
  static associate(models){
    //uno a uno el customer tiene un user
    //la FK debería estar en esta tabla es userId
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
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      //por defecto crea el updated_at y el created_at
      timestamps: false
     }
  }
};

module.exports = {CUSTOMER_TABLE,CustomerSchema,Customer}
