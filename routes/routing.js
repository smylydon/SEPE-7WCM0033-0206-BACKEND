var express = require('express');

var routes = function(models, authentication, authorization) {
    var router = express.Router();

    var external = {
        authorization: authorization(),
        authentication: authentication,
        router: router
    };

    require('./loginRoute')(external, models.User);

    require('./carsRoute')(external, models.Car);

    require('./commentsRoute')(external, models.Comment);

    return router;
};

module.exports = routes;
