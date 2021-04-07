const express = require('express');

const {Brand} = require('../Entity/Brand');
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
      const brandEntity = new Brand(process.env.READ, req.body, req.params);
      const id = brandEntity.getId;
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
      const brandEntity = new Brand(process.env.CREATE, req.body, req.params);
      const name = brandEntity.getName;
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
      const brandEntity = new Brand(process.env.UPDATE, req.body, req.params);
      const id = brandEntity.getId;
      const name = brandEntity.getName;
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
      const brandEntity = new Brand(process.env.DELETE, req.body, req.params);
      const id = brandEntity.getId;
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