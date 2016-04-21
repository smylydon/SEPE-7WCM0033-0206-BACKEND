var _ = require('lodash');
var express = require('express');
var multer = require('multer');
var uploads = multer({
    dest: 'public/images',
    fileFilter: function(req, files, cb) {
        var mimeTypesRegex = /(jpeg|jpg|png|bmp|giff)/;
        var mimeType = files.mimetype;

        if (mimeTypesRegex.test(mimeType)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

var routes = function(models, authentication, authorization) {
    var router = express.Router();

    var external = {
        authorization: authorization(),
        authentication: authentication,
        router: router,
        uploads: uploads
    };

    require('./loginRoute')(external, models.Person);

    require('./carsRoute')(external, models);

    require('./makesRoute')(external, models.Make);

    require('./commentsRoute')(external, models.Comment);

    require('./peopleRoute')(external, models.Person);

    return router;
};

module.exports = routes;
