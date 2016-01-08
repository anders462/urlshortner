
module.exports = function (db) {

var randomGen = require('random-gen');
var brokenLink = require('broken-link');
//var validUrl = require('valid-url')
var urls = db.collection('urls');
var counter = db.collection('counter');
var urlProjection = { '_id': false };
var newShort = {};

this.reDirect = function(req,res){
  console.log("find short url " + req.params.id);
  urls.findOne({short_url: "http://localhost:5000/" + req.params.id}, urlProjection, function(err,result){
    if (err){
      throw(err);
    }
    if (!result){
      console.log("no short url found")
       res.status(404).send({error:"not a short url, please try again"})
     } else {
       console.log("redirecting to " + result.original_url);
       res.redirect(result.original_url);
     }
  });

}

this.checkValid = function(req,res,next){
  console.log("testing if valid " + req.url.substr(5));
  brokenLink(req.url.substr(5),{allowRedirects:true})
          .then(function(answer) {
            if (answer){
              console.log("not valid");
              res.status(404).send({error:"not a valid url, please try again"});
            } else {
              console.log("valid");
              next();

            }
          });

}


this.urlInDb = function (req,res,next) {
  urls.findOne({original_url: req.url.substr(5)}, urlProjection, function(err,result){
    if (err){
      throw(err);
    }

    if (!result){
      console.log("not found call new shortUrl")
       next();
     } else {
       console.log("already have a shortcut");
       res.json(result);
     }
  });
}

this.newShortUrl = function(req,res,next){
  var baseUrl = "http://localhost:5000/" ;
  console.log("newUrl");

  counter.findAndModify({},{'_id': 1}, { $inc: { 'url_id': 1 }}, function(err,result){
    if (err){
      throw(err);
    }
      newShort = {original_url: req.url.substr(5),short_url: baseUrl + result.value.url_id};
      console.log("added 1 to url: " + newShort.short_url);
      next();
  });
};


this.addUrl = function(req,res){

        urls.insert(newShort, function(err){
              if (err){
                throw(err);
              } else {
                console.log("new url added");
                res.send(newShort);
              }
        });
};

};
