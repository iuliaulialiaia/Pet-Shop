const express = require('express');
const {validateFields} = require('../Entity/Validator');
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
      const {id} = req.params;
      const fields = [
        {type: 'int', value: id}
      ];
      validateFields(fields);

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
      const {name, target} = req.body;
      const fields = [
        {type: 'categoryName', value: name},
        {type: 'categoryTarget', value: target}
      ];
      validateFields(fields);

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
      const {id} = req.params;
      const {name, target} = req.body;
      const fields = [
        {type: 'int', value: id},
        {type: 'categoryName', value: name},
        {type: 'categoryTarget', value: target}
      ];
      validateFields(fields);

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
      const {id} = req.params;
      const fields = [
        {type: 'int', value: id}
      ];
      validateFields(fields);

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