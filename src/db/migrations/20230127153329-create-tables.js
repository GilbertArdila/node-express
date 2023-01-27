'use strict';
const {UserSchema,USER_TABLE} = require('./../models/user.model.js');
const {CategorySchema,CATEGORY_TABLE} = require('./../models/category.model.js');
const {ProductSchema,PRODUCT_TABLE} = require('./../models/product.model.js');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
     await queryInterface.createTable(USER_TABLE,UserSchema);
     await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
     await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);

  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
