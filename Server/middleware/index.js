var db = require("../models/index");
var middlewareOBJ = {};

middlewareOBJ.isLoggedIn = function(req, res, next){
     if(req.isAuthenticated()){
          next();
     }
     else {
          res.redirect("/login");
     }
}

module.exports = middlewareOBJ;