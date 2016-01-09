'use strict'

var UrlShort = require(process.cwd() + '/app/api/urlshortapp.js');
var validUrl = require('valid-url');

module.exports = function(app,db) {
//make urlShort available as an object with methods
var urlShort = new UrlShort(db);

// checks if new submitted URL is valid site by >>>accessing<<<<.
// Need to enter http://.... to work
var checkValid = function(req, res ,next) {
  if (validUrl.isWebUri(req.params[0])){
    console.log("url looks valid");
    next();
  } else {
    console.log("url doesn't look valid " + req.params[0]);
    res.status(404).send({error:" " + req.params[0] + " is not a valid url (use >> http://example.com), please try again"});
  }
};

//main route to serve index.html
  app.route('/')
  .get(function(req,res){
      res.sendFile(process.cwd() + '/public/index.html');
  });

  //redirect if possible to short url
  app.route('/:id')
  .get(urlShort.reDirect);

//route for all add new original_url api calls
  app.route('/new/*')
  .get(checkValid,urlShort.urlInDb,urlShort.newShortUrl,urlShort.addUrl);

}
