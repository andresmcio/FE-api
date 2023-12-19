const {Router} = require('express');
const { getAll, getBySku } = require('../controllers/products.controller');
const routes = Router();

routes.get('/products', getAll);
routes.get('/products/:sku', getBySku);

module.exports = routes;