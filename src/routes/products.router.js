const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/',async (req,res) => {
const products =await service.find();
  res.json(products);
});

//las rutas especificas deben declararse antes de las rutas con parámetros para evitar que choquen entre sí
router.get('/filter',  (req,res) => {
  res.send('Soy una ruta especifica, no un parámetro')
});

router.get('/:id',async (req,res) => {
  const {id} = req.params;
  const product =await service.findOne(id);
  if(product === undefined){
    res.status(404).json({
      message:'Product not found, please check your id'
    });
  }else{
    res.status(200).json(product);
  }

});

router.post('/',async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body)
  res.status(201).json(newProduct);
});

router.patch('/:id',async (req,res) => {

 try {
  const {id} = req.params;
  const body = req.body;
  const product =await service.update(id,body);
  res.status(200).json(product);
 } catch (error) {
  res.status(404).json({
    message: error.message
  })
 }
});


router.put('/:id',async (req,res) => {
 try {
  const {id} = req.params;
  const body = req.body;
  const product =await service.update(id,body);
  res.status(201).json(product);
 } catch (error) {
  res.status(404).json({
    message: error.message
  })
 }
});


router.delete('/:id', async(req,res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.status(202).json(response);
});




module.exports = router;
