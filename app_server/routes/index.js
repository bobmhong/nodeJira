var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/login.js');
var Cookies = require( "cookies" );

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookies = new Cookies(req, res);
  var mySession = cookies.get('JSESSIONID');
  //var mySession;

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

/* View Request */
router.get('/view/', ctrlLogin.view);

/* Logout Request */
router.get('/delete/', ctrlLogin.logout);

/*router.get('/delete/', function(req, res, next) {
  
  console.log('Logging out...');

});
*/
module.exports = router;
