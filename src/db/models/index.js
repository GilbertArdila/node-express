const {UserSchema,User} = require('./user.model');
const {CategorySchema,Category} = require('./category.model');
const {CustomerSchema,Customer} = require('./customer.model');
//const {OrderSchema,Order} = require('./order.model');
const {ProductSchema,Product} = require('./product.model');





function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
 // Order.init(OrderSchema, Order.config(sequelize))
 Product.init(ProductSchema, Product.config(sequelize))

 //ejecutamos las asociaciones y enviamos los modelos
 Customer.associate(sequelize.models);
 User.associate(sequelize.models);
 Category.associate(sequelize.models);
 Product.associate(sequelize.models);
};

module.exports = setupModels;
