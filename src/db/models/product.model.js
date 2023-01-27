const {Model, DataTypes, Sequelize} = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');


const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,

  },
  price:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  image:{
    allowNull: false,
    type: DataTypes.STRING
  },
  description:{
    allowNull: false,
    type: DataTypes.TEXT
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  //relación con categoria, el producto solo puede tener una categoria
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //no ponemos unique false porque queremos muchos productos en la misma categoria
    references: {
      //se refiere a qué tabla se hace la relación y su primary key
     model: CATEGORY_TABLE,
     key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Product extends Model{
  static associate(models){
    //un producto pertenece a una categoria
    this.belongsTo(models.Category,{as:'category'});
  }

  static config(sequelize){
     return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      //por defecto crea el updated_at y el created_at
      timestamps: false
     }
  }
};

module.exports = {PRODUCT_TABLE,ProductSchema,Product}
