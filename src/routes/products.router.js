const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();

router.get('/', (req,res) => {
const products = service.find();
  res.json(products);
});

//las rutas especificas deben declararse antes de las rutas con parámetros para evitar que choquen entre sí
router.get('/filter', (req,res) => {
  res.send('Soy una ruta especifica, no un parámetro')
});

router.get('/:id', (req,res) => {
  const {id} = req.params;
  const product = service.findOne(id);
  if(product === null){
    res.status(404).json({
      message:'404 Not found'
    })
  }else{
    res.status(200).json(product);
  };


});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  res.status(200).json({
    message:'ok',
    data:body,
    id
  });
});


router.put('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  res.status(201).json({
    message:'created',
    data:body,
    id
  });
});


router.delete('/:id', (req,res) => {
  const {id} = req.params;
  res.status(202).json({
    message:'acepted',
    id
  });
});




module.exports = router;
