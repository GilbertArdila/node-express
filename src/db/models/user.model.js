const {Model, DataTypes, Sequelize} = require('sequelize');


const USER_TABLE = 'users';
const UserSchema = {
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
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model{
  static associate(){

  }

  static config(sequelize){
     return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      //por defecto crea el updated_at y el created_at
      timestamps: false
     }
  }
};

module.exports = {USER_TABLE,UserSchema,User}
