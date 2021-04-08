const express = require('express');
const {validateFields} = require('../Entity/Validator');
const BrandRepository = require('../Repository/BrandRepository');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    try {
      const brands = await BrandRepository.getAll();
      res.json(brands);
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

      const brand = await BrandRepository.getById(id);
      res.json(brand);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const {name} = req.body;
      const fields = [
        {type: 'alphanumeric', value: name}
      ];
      validateFields(fields);

      await BrandRepository.add(name);
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
      const {name} = req.body;
      const fields = [
        {type: 'int', value: id},
        {type: 'alphanumeric', value: name}
      ];
      validateFields(fields);

      await BrandRepository.updateById(id, name);
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

      await BrandRepository.deleteById(id);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = {
  BrandController: router
};