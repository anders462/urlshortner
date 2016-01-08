'use strict';
var express = require('express'),
    mongo = require('mongodb').MongoClient,
    routes = require(process.cwd() + '/app/routes/index.js');

//Create app
var app = express();
//connect to Database
mongo.connect(process.env.MONGO_URI, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
//set port to env.Port and 5000 as fallback
app.set('port', (process.env.PORT || 5000));

app.use('/public',express.static(process.cwd() + '/public'));
app.use('/bower_components',  express.static(process.cwd() + '/bower_components'));
//app.use('/app/api',  express.static(process.cwd() + '/app/api'));

routes(app,db);

app.listen(app.get('port'), function(){
  console.log("server is running on port 5000...");
});

});
