const express = require('express');
const {BrandController} = require('./BrandController.js');
const {CategoryController} = require('./CategoryController.js');
const {ProductController} = require('./ProductController.js');

const app = express();

app.use('/brand', BrandController);
app.use('/category', CategoryController);
app.use('/product', ProductController);

module.exports = {
  routes: app
};