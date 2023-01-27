const {Model, DataTypes, Sequelize} = require('sequelize');


const CUSTOMER_TABLE = 'Customers';
const CustomerSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    //no puede haber más de un usuario con el mismo email
    unique: true
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING
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
    type: DataTypes.INTEGER
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Customer extends Model{
  static associate(){

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
