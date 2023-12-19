const {Router} = require('express');
const {init } = require('../controllers/main.controller');
const routes = Router();

routes.get('/', init);

module.exports = routes;