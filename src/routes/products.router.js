const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

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
  if(product === undefined){
    res.status(404).json({
      message:'Product not found, please check your id'
    });
  }else{
    res.status(200).json(product);
  }

});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json(newProduct);
});

router.patch('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  const product = service.update(id,body);
  res.status(200).json(product);
});


router.put('/:id', (req,res) => {
  const {id} = req.params;
  const body = req.body;
  const product = service.update(id,body);
  res.status(201).json(product);
});


router.delete('/:id', (req,res) => {
  const {id} = req.params;
  const response = service.delete(id);
  res.status(202).json(response);
});




module.exports = router;
