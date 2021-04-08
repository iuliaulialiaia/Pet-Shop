const express = require('express');
const {Category} = require('../Entity/Category');
const CategoryRepository = require('../Repository/CategoryRepository');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    try {
      const categories = await CategoryRepository.getAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id',
  async (req, res, next) => {
    try {
      const categoryEntity = new Category(process.env.READ, req.body, req.params);
      const id = categoryEntity.getId;
      const category = await CategoryRepository.getById(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const categoryEntity = new Category(process.env.CREATE, req.body, req.params);
      const name = categoryEntity.getName;
      const target = categoryEntity.getTarget;
      await CategoryRepository.add(name, target);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id',
  async (req, res, next) => {
    try {
      const categoryEntity = new Category(process.env.UPDATE, req.body, req.params);
      const id = categoryEntity.getId;
      const name = categoryEntity.getName;
      const target = categoryEntity.getTarget;
      await CategoryRepository.updateById(id, name, target);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const categoryEntity = new Category(process.env.DELETE, req.body, req.params);
      const id = categoryEntity.getId;
      await CategoryRepository.deleteById(id);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = {
  CategoryController: router
};