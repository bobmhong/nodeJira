var Cookies = require( "cookies" );
const jirahost = "http://192.168.99.100:8080";
var loginurl = jirahost + "/rest/auth/1/session";
var viewurl = jirahost + "/rest/api/2/search";

var options_proxy = {
    proxy: {
        host: "127.0.0.1",
        port: 8080
    }
};

module.exports.loginget = function(req, res, next) {
  var cookies = new Cookies(req, res);
  var mySession = cookies.get('JSESSIONID');
  console.log('get->JSESSIONID:' + mySession);

  res.render('login', { 
    title: 'Login',
    mySession: mySession
  });
}

module.exports.logout = function(req, res, next) {
  var Client = require('node-rest-client').Client;  
  client = new Client(options_proxy);
  
  var Cookies = require( "cookies" );
  var cookies = new Cookies(req, res); 
  const sessionName = 'JSESSIONID';
  var mySession = cookies.get(sessionName);
  
  console.log('Logging out session ' + mySession + 'by calling ' + loginurl);

  cookies.set(sessionName); 
  var logoutArgs = {
    headers: {
      cookie: sessionName + '=' + mySession,
      "Content-Type": "application/json"
    }
  };

  client.delete(loginurl, logoutArgs, function(data, response){
  if (response.statusCode == 204) {
    console.log('succesfully logged out session:');      
  }
  
  else {
    console.log("Logout failed :(" + response.statusCode);
  }
  res.render('login', {
      title: 'Login',
      mysession: 'undefined'
    }); 
  })

}

module.exports.view = function(req, res, next) {
  var Client = require('node-rest-client').Client;  
  client = new Client(options_proxy);
  
  var Cookies = require( "cookies" );
  var cookies = new Cookies(req, res); 
  const sessionName = 'JSESSIONID';
  var mySession = cookies.get(sessionName);
  
  console.log('Viewing some JIRA...');

  var searchArgs = {
    headers: {
      // Set the cookie from the session information
      cookie: sessionName + '=' + mySession,
      "Content-Type": "application/json"
    },
    data: {
    // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
      jql: "type=Task"
    }
  };
  
  // Make the request return the search results, passing the header information including the cookie.
  client.post(viewurl, searchArgs, function(searchResult, response) {

    console.log('search status code:', response.statusCode);

    if (response.statusCode == 200) {
      console.log('search result:', searchResult);
    }
    else {
      console.log("search failed :(" + response.statusCode);
    }
    
  });

  res.render('index', { 
      title: 'Express Home',
      mySession: mySession,
      logouturl: '/delete/' }); 

}

module.exports.loginpost = function(req, res){
  var Client = require('node-rest-client').Client;  
  client = new Client(options_proxy);
  
  var Cookies = require( "cookies" );
  var cookies = new Cookies(req, res); 
  
  //var username = req.body.username;
  //var password = req.body.password;
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

    // Success - redirect to index regular flow
    res.render('index', { 
      title: 'Express Home',
      mySession: mySession,
      logouturl: '/delete/' });
  }
  
  else {
    Console.log("Login failed :(");
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
