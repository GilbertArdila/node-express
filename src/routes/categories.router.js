const express = require('express');
const passport = require('passport');
const  {checkRoles} = require('./../middlewares/auth.handler');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  queryCategorySchema,
} = require('./../schemas-DTO/category.dto');

const router = express.Router();
const service = new CategoryService();

//cualquier usuario puede ver las categorias, pero solo usuarios con token pueden editar, crear y borrar
router.get(
  '/',
  validatorHandler(queryCategorySchema, 'query'),
  async (req, res, next) => {
    try {
      const categories = await service.find(req.query);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  //si tiene token puede pasamos a checkear el rol para dar permisos
  passport.authenticate('jwt', { session: false }),
  //le envio los roles que pueden ingresar 'admin','customers'
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
