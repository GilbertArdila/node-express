const express = require('express');
const routerApi = require('./src/routes');
const {logErrors,errorHandler,boomErrorHandler} = require('./src/middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//cors
const whiteList = ['http://localhost:8080','https://myApp.com'];
const options = {
  origin:(origin,callback) => {
    if(whiteList.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error('Accesss not allowed'));
    };
  }
};
app.use(cors(options));


app.listen(port, () => {
  console.log(`${port}`);
});

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
