const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;
const IP = '192.168.20.26';


app.listen(port, () => {
  console.log(`http://${IP}:${port}/`);
});

app.get('/',(req,res) => {
  res.send('Mi primer servido con Node.js y Platzi!!  :)')
});

//Parámetros GET

app.get('/products', (req,res) => {
  const products = [];
  const {size} = req.query;
  const limit= size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });

  }
  res.json(products);
});

//las rutas especificas deben declararse antes de las rutas con parámetros para evitar que choquen entre sí
app.get('/products/filter', (req,res) => {
  res.send('Soy una ruta especifica, no un parámetro')
});

app.get('/products/:id', (req,res) => {
  const {id} = req.params;
  res.json(
    {
      id,
      product_name: 'Zapatillas Adidas',
      price: 100,
      color: 'black',
      size: 8
    }
  );
});

app.get('/categories', (req,res) => {
  res.json([
    {
     name:'Electronics',
    },
    {
      name:'Toys',
     },
     {
      name:'Clothes',
     }
]);
});

app.get('/categories/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  )
});
app.get('/users', (req,res) => {
  res.json([
    {
     name:'Jhon Doe',
     adress:"15 av, down town street"
    },
    {
      name:'Jhane Doe',
      adress:"36 av, claire street"
     },
     {
      name:'bebeloper Doe',
      adress:"Quintana road st"
     },
]);
});

app.get('/users/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  )
});

app.get('/orders', (req,res) => {
  res.json([
    {
    number:15
    },
    {
      number:36
     },
     {
     number:54
     },
]);
});

app.get('/orders/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  );
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
