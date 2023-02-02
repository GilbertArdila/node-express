## run commands
 - npm run dev
 - npm run start
 - npm run migrations:generate migrationName  crea una migración
 - npm run migrations:run   genera el archivo de la migración
 - npm run migrations:revert   revierte la última migración hecha
 - npm run migrations:delete  borra todas las migraciones hechas, inicia todo de cero

## run commands to up the docker service
- first you must open docker desktop
- docker-compose up -d postgres  to up the service
- docker-compose up -d mysql
- docker-compose up -d pgadmin
- docker-compose up -d phpmyadmin 
- docker-compose ps  to inspect what services are running
- docker-compose down to down the services
- docker-compose exec postgres bash   open bash console
- docker ps to check the container's id
-  docker inspect id to see the ip adress
- psql -h localhost -d dbName -U usuario
- \d+ to see the db infracstructure
- \q to exit db
- exit to leave the container


### RESTful API
 
- GET-POST-PUT/PATCH-DELETE


//Method     /products      /products/{id}


//GET        Get a list      Get one product


//PUT         xxxxxxx        Update or replace a product


//PATCH       xxxxxxx        Update a product


//POST      Create a product  xxxxxxxx


//DELETE      xxxxxxx        Delete a product


### the clean architecture

- Entities
- Use cases
- Controllers
- Services
- Libs



### file's creation order
- docker-compose
- config/config.js
- env/en.example
- libs/sequelize
- libs/postgres  only for practices
- libs/postgresPool  only for practices
- sequelizerc
- db/models
- db/seeders
- db/config.js
- db/models/index.js
- db/models/models
- utils/auth/index.js
- utils/auth/strategies
- token-sing.js    only for practices
- token-verify.js   only for practices
- schemas
- middlewares
- middlewares/error.handler 
- middlewares/validator.handler 
- middlewares/auth.handler   
- services
- routes
- index (routes)
- index (main app)
- mailer.js only for practices



### according to db relationships


 #### one to one


  - hasOne the b table has the relationship 
  - belongsTo a table has the relationship example in customer.model 

 ### one to many


 - hasMany one category could has many products

 ### many to many

 - belongsToMany one order has many products and one product could be in many orders
