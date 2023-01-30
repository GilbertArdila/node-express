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
  },
  //con este objeto de sequelize podemos arrojar el total del precio en un tipo de dato virtual, no está en la tabla este items es el alias que le dimos en la associate, no recomendable para datos muy grandes, se hace con queries
  total:{
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items && this.items.length  > 0){
        return this.items.reduce((total,item)=>{return total + (item.price * item.OrderProduct.amount)},0)
      }
      return 0;
    }
  }
};

class Order extends Model{
  static associate(models){
    //una orden un cliente
    this.belongsTo(models.Customer,{as:'customer'});
    //relación muchos a muchos order/product, la orden va a tener muchos productos
    this.belongsToMany(models.Product,{
      //los productos de es orden los vamos a llamar items
      as: 'items',
      //este es el modelName que le dimos a la tabla, esta es la tabla que va a resolver esa relación muchos a muchos, la tabla pivote
      through: models.OrderProduct,
      // esta es la FK que le dimos en order-product a las ordenes, esta es la llave de la tabla que resuelve la relación, en este caso order
      foreignKey: 'orderId',
      //esta es la FK que le dimos en order-product a los products, la otra tabla con la que se relaciona
      otherKey: 'productId'
    })

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
