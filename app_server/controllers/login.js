var Cookies = require( "cookies" );
var loginurl = "http://192.168.99.100:8080/rest/auth/1/session";

module.exports.loginget = function(req, res, next) {
  var cookies = new Cookies(req, res);
  var mySession = cookies.get('JSESSIONID');
  console.log('get->JSESSIONID:' + mySession);

  res.render('login', { 
    title: 'Login',
    mySession: mySession
  });
}

module.exports.loginpost = function(req, res){
  var Client = require('node-rest-client').Client;  
  client = new Client();
  
  var Cookies = require( "cookies" );
  var cookies = new Cookies(req, res); 
  
  // var username = req.body.username;
  // var password = req.body.password;
  var username = "bobmhong";
  var password = "Ffg862KWHx";
  
  console.log('Logging in ' + username);
  
  var loginArgs = {
        data: {
                "username": username,
                "password": password
        },
        headers: {
                "Content-Type": "application/json"
        } 
  };

  client.post(loginurl, loginArgs, function(data, response){
  if (response.statusCode == 200) {
    console.log('succesfully logged in, session:', data.session);
    var session = data.session;
    var mySession = session.value;
    cookies 
      .set( session.name, session.value, { httpOnly: false } );

    // Get the session information and store it in a cookie in the header
    var searchArgs = {
            headers: {
              cookie: session.name + '=' + mySession,
              "Content-Type": "application/json"
            },
            data: {
              // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
              jql: "type=Bug AND status=Closed"
            }
    };

    // Success - redirect to index regular flow
    res.render('index', { 
      title: 'Express Home',
      mySession: mySession });
  }
  
  else {
    throw "Login failed :(";
  }
  });

module.exports.logindelete = function(req, res){
  var Client = require('node-rest-client').Client;  
  client = new Client();
  
  var Cookies = require( "cookies" );
  var cookies = new Cookies(req, res); 
  
  console.log('Logging out...');

  client.delete(loginurl, function(data, response){
  if (response.statusCode == 200) {
    console.log('succesfully logged out session:');
    
    cookies
      .delete(session.name); 
      
    // Success - redirect for regular flow
    res.render('login', {
      title: 'Login',
      mysession: 'undefined'
    });   
  }
  
  else {throw "Logout failed :(";}
  })
}};
