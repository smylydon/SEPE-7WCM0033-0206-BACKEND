var express = require('express');
var _ = require("lodash-node");

var routes = function(User) {
  var authenticationRouter = express.Router();
  var authenticationController = require('../controllers/authenticationController')(User);

  function ensureAuthorized(req, res, next) {
    console.log('ensureAuthorized');
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (!_.isUndefined(bearerHeader)) {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      console.log('send Status 403');
      res.sendStatus(403);
    }
  }

  function findUser(req, res, next) {
    console.log('findUser');
    User.findOne({
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      if (err) {
        res.status(500).json({
          type: false,
          data: "Error occurred:" + err
        });
      } else if (user) {
        req.user = user;
        next();
      } else {
        req.user = null;
        next();
      }
    });
  }
//console.log('pick route: ', new Date());
  authenticationRouter.use('/authenticate', findUser);
  authenticationRouter.use('/signin', findUser);
  authenticationRouter.use('/me', ensureAuthorized);

  authenticationRouter.route('/authenticate')
    .post(authenticationController.authenticatePost);

  authenticationRouter.route('/signin')
    .post(authenticationController.signinPost);


  authenticationRouter.route('/me')
    .get(authenticationController.getMe);

  return authenticationRouter;
}

module.exports = routes;
