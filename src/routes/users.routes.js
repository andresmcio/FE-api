const {Router} = require('express');
const {access, createUser} = require('../controllers/users.controller');
const routes = Router();

routes.post('/users/login', access);
routes.post('/users/register', createUser);

module.exports = routes;