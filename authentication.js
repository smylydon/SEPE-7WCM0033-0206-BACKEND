var jwt = require('jsonwebtoken');
var _ = require('lodash-node');

function ensureAuthentication(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers['authorization']; //jshint ignore:line

    if (!_.isUndefined(bearerHeader)) {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Bad token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'No token.'
        });
    }
}

module.exports = ensureAuthentication;
