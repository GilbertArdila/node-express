const express = require('express');

const app = express();
const port = 3000;
const IP = '192.168.20.26';


app.listen(port, () => {
  console.log(`http://${IP}:${port}/`);
});

app.get('/',(req,res) => {
  res.send('Mi primer servido con Node.js y Platzi!!  :)')
});



app.get('/products', (req,res) => {
  res.json([
    {

      product_name: 'Zapatillas Nike Air force one',
      price: 120,
      color: 'white and blue',
      size: 7.5
    },
    {

      product_name: 'Zapatillas Adidas',
      price: 100,
      color: 'black',
      size: 8
    }
  ]);
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





app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const {categoryId,productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});


