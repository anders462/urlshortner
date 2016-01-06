'use strict';
var express = require('express');
var routes = require(process.cwd() + '/app/routes/index.js');
//var unixConv = require('./app/api/unixConv.js');
//Create app
var app = express();

//set port to env.Port and 5000 as fallback
app.set('port', (process.env.PORT || 5000));

app.use(express.static(process.cwd() + '/public'));
app.use('/bower_components',  express.static(process.cwd() + '/bower_components'));
//app.use('/app/api',  express.static(process.cwd() + '/app/api'));

routes(app);

app.listen(app.get('port'), function(){
  console.log("server is running on port 5000...");
});
