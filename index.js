const express = require('express');

const app = express();
const port = 3000;
const IP = '192.168.20.26';

app.get('/',(req,res) => {
  res.send('Mi primer servido con Node.js y Platzi!!  :)')
});

app.get('/productos', (req,res) => {
  res.json({
    product_name: 'Zapatillas Nike Air force one',
    price: 120,
    color: 'white and blue',
    size: 7.5
  });
});

app.get('/otra-ruta', (req,res) => {
  res.send('otra ruta más');
});

app.listen(port, () => {
  console.log(`http://${IP}:${port}/`);
});

// RESTful API
// GET-POST-PUT/PATCH-DELETE

//Method     /products      /products/{id}
//GET        Get a list      Get one product
//PUT         xxxxxxx        Update or replace a product
//PATCH       xxxxxxx        Update a product
//POST      Create a product  xxxxxxxx
//DELETE      xxxxxxx        Delete a product
