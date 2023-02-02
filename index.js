const express = require('express');
const routerApi = require('./src/routes');
const {checkApiKey} = require('./src/middlewares/auth.handler');
const {logErrors,errorHandler,boomErrorHandler,ormErrorHandler} = require('./src/middlewares/error.handler');
const cors = require('cors');

const app = express();
const port =process.env.PORT || 3000;
app.use(express.json());



//cors
const whiteList = ['http://localhost:8080','https://myApp.com'];
const options = {
  origin:(origin,callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('Accesss not allowed'));
    };
  }
};
app.use(cors(options));

//llamamos el index del auth para ejecutar la estrategia de autenticación
require('./src/utils/auth');




app.get('/',(req,res) => {
  res.send('Mi primer servido con Node.js y Platzi!!  :)')
});




//multiples parámetros
app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const {categoryId,productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});

// Query params

app.get('/people', (req, res) => {
  const {limit, offset} = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No has enviado parámetros')
  }
});



routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`using the port: ${port}`);
});
