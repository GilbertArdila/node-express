const {Sequelize} = require('sequelize');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  //para mostrar el resultado de la consulta en consola
  logging: true
});

module.exports= {sequelize};
