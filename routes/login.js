var express = require('express');
var router = express.Router();
var ctrlLogin = require('../app_server/controllers/login.js')


/* GET login page. */
router.get('/login/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Process Login Request */
//router.post('/login/', ctrlLogin.loginpost);
router.post('/login/', function(req, res, next) {
  res.render('login', { title: 'Login Post' });
});

module.exports = router;
