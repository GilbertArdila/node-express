const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/', (req,res) => {
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

router.get('/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  )
});

module.exports = router;
