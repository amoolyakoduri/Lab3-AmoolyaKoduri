const routes = require('express').Router();
var passport = require('passport');
require('./../config/passport')(passport);
var auth = require('./auth').routes;
var user = require('./user').routes;
var rest = require('./rest').routes;

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/rest', rest);

module.exports.routes = routes;