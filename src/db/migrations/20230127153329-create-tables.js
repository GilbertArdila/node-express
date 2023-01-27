'use strict';
const {UserSchema,USER_TABLE} = require('./../models/user.model.js');
const {CategorySchema,CATEGORY_TABLE} = require('./../models/category.model.js');
const {ProductSchema,PRODUCT_TABLE} = require('./../models/product.model.js');
const {CUSTOMER_TABLE,CustomerSchema} = require('./../models/customer.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
     await queryInterface.createTable(USER_TABLE,UserSchema);
     await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
     await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
     await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);

  },

  async down (queryInterface) {

    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);

  }
};
