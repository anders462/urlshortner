'use strict'

var UrlShort = require(process.cwd() + '/app/api/urlshortapp.js');

module.exports = function(app,db) {

var urlShort = new UrlShort(db);

//main route to serve index.html
  app.route('/')
  .get(function(req,res){
      res.sendFile(process.cwd() + '/public/index.html');
  });
/*  //redirect if possible to short url
  app.route('/:id')
  .get(urlShort.reDirect);
*/
//route for all add new original_url api calls
  app.route('/new/*')
  .get(urlShort.checkValid,urlShort.urlInDb,urlShort.newShortUrl,urlShort.addUrl);

}
