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
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  recoveryToken:{
    //por defecto no recupera la contraseña, solo cuando la necesite recuperar
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token'
  }
};

class User extends Model{
  static associate(models){
    //el usuario pertenece a un cliente o tiene un cliente
    this.hasOne(models.Customer,{
      as: 'customer',
      //la FK que declaramos en customer.model
      foreignKey: 'userId'
    })

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
