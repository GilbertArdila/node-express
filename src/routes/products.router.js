const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//las rutas especificas deben declararse antes de las rutas con parámetros para evitar que choquen entre sí
router.get('/filter', (req, res) => {
  res.send('Soy una ruta especifica, no un parámetro');
});

router.get('/:id', async (req, res,next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res,next) => {
  try {
    const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
  } catch (error) {
    next(error)
  }

});

router.patch('/:id', async (req, res,next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res,next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(201).json(product);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
     const { id } = req.params;
  const response = await service.delete(id);
  res.status(202).json(response);
  } catch (error) {
    next(error)
  }

});

module.exports = router;
