'use strict';
const {UserSchema,USER_TABLE} = require('./../models/user.model.js');
const {CategorySchema,CATEGORY_TABLE} = require('./../models/category.model.js');
const {ProductSchema,PRODUCT_TABLE} = require('./../models/product.model.js');
const {CUSTOMER_TABLE,CustomerSchema} = require('./../models/customer.model');
const {ORDER_TABLE,} = require('./../models/order.model');
const {OrderProductSchema,ORDER_PRODUCT_TABLE} = require('./../models/order-product.model');
const {Sequelize,DataTypes} = require('sequelize');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
     await queryInterface.createTable(USER_TABLE,UserSchema);
     await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
     await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
     await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
     //to avoid the virtual data type error unlink the schema in orders
     await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
     await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);



  },

  async down (queryInterface) {

    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);



  }
};
