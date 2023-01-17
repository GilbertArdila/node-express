const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req,res) => {
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
router.get('/filter', (req,res) => {
  res.send('Soy una ruta especifica, no un parámetro')
});

router.get('/:id', (req,res) => {
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

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message:'updated',
    data:body,
    id
  });
});


router.put('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message:'updated',
    data:body,
    id
  });
});


router.delete('/:id', (req,res) => {
  const {id} = req.params;
  res.json({
    message:'deleted',
    id
  });
});




module.exports = router;
