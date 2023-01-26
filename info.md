# Installing dependencies

- npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D

## run commands
 - npm run dev
 - npm run start

## run commands to up the docker service
- first you must open docker desktop
- docker-compose up -d postgres  to up the service
- docker-compose up -d pgadmin 
- docker-compose ps  to inspect what services are running
- docker-compose down to down the services
- docker-compose exec postgres bash   open bash console
- docker ps to check the container's id
-  docker inspect id to see the ip adress
- psql -h localhost -d dbName -U usuario
- \d+ to see the db infracstructure
- \q to exit db
- exit to leave the container


## Installing express
- npm i express


## Installing faker
- npm i faker@5.5.3 -S

## Installing Boom
- npm i @hapi/boom

## Installing Joi
- npm i joi

## Installing cors
- npm i cors

## Installing node-postgres
- npm i pg




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
- schemas
- middlewares
- services
- routes
- index (routes)
- index (main app)
