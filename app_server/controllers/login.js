var request = require('request');

module.exports.loginpost = function(req, res){
  console.log('Handling Post' + req.body.username);
  
  //res.send('Logging in....');
  res.render('layout', { title: 'Login Post' + req.body.username });
};
