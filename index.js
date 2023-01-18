const express = require('express');
const routerApi = require('./src/routes');
const {logErrors,errorHandler} = require('./src/middlewares/error.handler');

const app = express();
const port = 3000;
app.use(express.json());
routerApi(app);
app.use(logErrors);
app.use(errorHandler);



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
