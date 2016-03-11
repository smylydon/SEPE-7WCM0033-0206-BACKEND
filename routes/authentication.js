var express = require('express');

var routes = function(models, authentication, authorization) {
    var authenticationRouter = express.Router();
    var authenticationController = require('../controllers/authenticationController')(models.User);
    var external = {
        authorization: authorization,
        authentication: authentication,
        authenticationRouter: authenticationRouter
    };
    /*
      authenticationRouter.use('/comments', ensureAuthorized);
    */

    authenticationRouter.route('/login')
        .post(authenticationController.login);

    require('./carsRoute')(authenticationRouter, models.Car);

    require('./commentsRoute')(external, models.Comment);

    return authenticationRouter;
};

module.exports = routes;
