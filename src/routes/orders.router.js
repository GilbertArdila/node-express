const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('/', (req,res) => {
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

router.get('/:id',(req,res) => {
  const {id} = req.params;
  res.json(
    {
     id
    }
  );
});

module.exports = router;
