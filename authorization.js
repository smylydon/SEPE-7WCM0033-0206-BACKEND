var acl = require('acl');
var client = require('redis').createClient(6379, '127.0.0.1', {no_ready_check: true});

acl = new acl(new acl.redisBackend(client,'acl_'));

function authorization(req, res, next) {
    next();
}

module.exports = authorization;
