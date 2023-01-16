const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');


function routerApi(app) {
  app.use('/products',productsRouter);
  app.use('/users',usersRouter);
  app.use('/categories',categoriesRouter);
  app.use('/orders',ordersRouter);
};

module.exports = routerApi;
