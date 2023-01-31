const jwt = require('jsonwebtoken');

const secret = 'docky'
//en el payload no se debe guardar información sensible
const payload = {
  sub:1,
  role:'customer'
};

const signToken = (payload,secret) => {
  return jwt.sign(payload,secret)
};

const token = signToken(payload,secret);
console.log(token);

