'use strict'
var timeStamp = require(process.cwd() + '/app/api/timestamp.js');

module.exports = function(app) {

//main route to serve index.html
  app.get('/', function(req,res){
      res.send("index.html");
  });

//route for all api calls
  app.get('/:query', function(req,res) {
    timeStamp(req, function(err,time){
      if (!err){
      res.send(time);
    } else {
      res.send("Error: " + err);
    }
  });
  });
};
