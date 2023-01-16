const express = require('express');

const app = express();
const port = 3000;

app.get('/',(req,res) => {
  res.send('Mi primer servido con Node.js y Platzi!! :)')
});

app.listen(port, () => {
  console.log('My port', port);
});

