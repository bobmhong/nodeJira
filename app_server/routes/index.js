var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/login.js');
var Cookies = require( "cookies" );

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookies = new Cookies(req, res);
  var mySession = cookies.get('JSESSIONID');

  console.log('JSESSIONID:' + mySession);

  if (mySession === undefined) {
  res.render('login', { 
      title: 'Login',
      mysession: mySession
  });

  }
  else{
    res.render('index', { 
      title: 'Home',
      mySession: mySession,
      logouturl: '/delete/'
     });
  }
});

/* GET login page. */
router.get('/login/', ctrlLogin.loginget);

/* Process Login Request */
router.post('/login/', ctrlLogin.loginpost);

/* Logout Request */
// router.delete('/login/', ctrlLogin.logindelete);

module.exports = router;
