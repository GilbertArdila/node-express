const jwt = require('jsonwebtoken');

const secret = 'docky';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTE3ODk4N30.MD0Ul4vaAo_v6gLInxKYLyfIUF5Ltyav9fquagIC90A';


const verifyToken = (token,secret) => {
  return jwt.verify(token,secret)
};

const payload = verifyToken(token,secret);
console.log(payload);
