const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/', (req,res) => {
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

router.get('/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  )
});

module.exports = router;
