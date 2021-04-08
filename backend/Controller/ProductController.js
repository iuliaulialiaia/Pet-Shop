const express = require('express');
const {validateFields} = require('../Entity/Validator');
const ProductRepository = require('../Repository/ProductRepository');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    try {
      const products = await ProductRepository.getAll();
      res.json(products);
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
        {type: 'int+', value: id}
      ];
      validateFields(fields);

      const product = await ProductRepository.getById(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const {name, price, quantity, description, comments, rating, brand_id, category_id} = req.body;
      let fields = [
        {type: 'name', value: name},
        {type: 'float', value: price},
        {type: 'int+', value: brand_id},
        {type: 'int+', value: category_id}
      ];
      if (quantity) fields.push({type: 'int+', value: quantity});
      if (description) fields.push({type: 'ascii', value: description});
      if (comments) fields.push({type: 'ascii', value: comments});
      if (rating) fields.push({type: 'rating', value: rating});
      validateFields(fields);

      await ProductRepository.add(name, price, quantity, description, comments, rating, brand_id, category_id);
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
      const {name, price, quantity, description, comments, rating, brand_id, category_id} = req.body;
      let fields = [
        {type: 'int+', value: id},
        {type: 'name', value: name},
        {type: 'float', value: price},
        {type: 'int+', value: brand_id},
        {type: 'int+', value: category_id}
      ];
      if (quantity) fields.push({type: 'int+', value: quantity});
      if (description) fields.push({type: 'ascii', value: description});
      if (comments) fields.push({type: 'ascii', value: comments});
      if (rating) fields.push({type: 'rating', value: rating});
      validateFields(fields);

      await ProductRepository.updateById(id, name, price, quantity, description, comments, rating, brand_id, category_id);
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
        {type: 'int+', value: id}
      ];
      validateFields(fields);

      await ProductRepository.deleteById(id);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = {
  ProductController: router
};