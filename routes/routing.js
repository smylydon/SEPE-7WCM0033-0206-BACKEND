var express = require('express');
var multer = require('multer');
var uploads = multer({dest: 'uploads/'});

var routes = function(models, authentication, authorization) {
    var router = express.Router();

    var external = {
        authorization: authorization(),
        authentication: authentication,
        router: router,
        uploads: uploads
    };

    require('./loginRoute')(external, models.User);

    require('./carsRoute')(external, models.Car, models.Make);

    require('./commentsRoute')(external, models.Comment);

    require('./peopleRoute')(external, models.Person, models.User);

    return router;
};

module.exports = routes;
