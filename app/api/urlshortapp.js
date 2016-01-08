
module.exports = function (db) {

var randomGen = require('random-gen');
var brokenLink = require('broken-link');
var urls = db.collection('urls');
var urlProjection = { '_id': false };
var newShort={};

this.reDirect = function(req,res){
  console.log("find short url " + req.params.id);
  urls.findOne({short_url: "http://localhost:5000/" + req.params.id}, urlProjection, function(err,result){
    if (err){
      throw(err);
    }
    if (!result){
      console.log("no short url found")
       res.send({error:"not a short url, please try again"})
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
              res.send({error:"not a valid url, please try again"});
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
  var randomUrl = "http://localhost:5000/" + randomGen.number(1).toLowerCase();
  console.log(randomUrl);

  urls.findOne({short_url: randomUrl}, urlProjection, function(err,result){
    if (err){
      throw(err);
    }

    if(!result){
      newShort = {original_url: req.url.substr(5),short_url: randomUrl};
      console.log("test");
      console.log(newShort);
      next();
    } else {
      console.log("short exists");
    
    }
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
