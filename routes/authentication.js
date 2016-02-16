var express = require('express');
var jwt = require("jsonwebtoken");
var _ = require("lodash-node");

var routes = function(models) {
  var authenticationRouter = express.Router();
  var authenticationController = require('../controllers/authenticationController')(models.User);

  function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (!_.isUndefined(bearerHeader)) {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          res.status(403).json({
            success: false,
            message: "Bad token."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      res.status(403).json({
        success: false,
        message: "No token."
      });
    }
  }

  //console.log('pick route: ', new Date());
  /*
  authenticationRouter.use('/authenticate', findUser);
  authenticationRouter.use('/signin', findUser);
  authenticationRouter.use('/me', ensureAuthorized);

  authenticationRouter.route('/authenticate')
    .post(authenticationController.authenticatePost);

  authenticationRouter.route('/signin')
    .post(authenticationController.signinPost);

*/
  authenticationRouter.route('/login')
    .post(authenticationController.login);
  return authenticationRouter;
}

module.exports = routes;
