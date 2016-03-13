var _ = require('lodash-node');
var Q = require('bluebird');
var ACL = require('acl');
var client = require('redis').createClient(6379, '127.0.0.1', {
    no_ready_check: true
});
var accessLevels = ['guest', 'administrator', 'manager', 'saleperson', 'guest'];

function authorization() {
    var acl = new ACL(new ACL.redisBackend(client, 'acl_'));

    acl.addRoleParents('guest', ['salesperson', 'manager', 'administrator']);
    acl.allow([{
        roles: ['salesperson'],
        allows: [{
            resources: '/comments',
            permissions: ['get', 'put', 'delete']
        }]
    }]);

    function authorize(userId, level) {
        var access = accessLevels[level];
        var authorizationPromise = Q.defer();

        if (_.indexOf(accessLevels, access) >= 0) {
            acl.addUserRoles(userId, access, function(err) {
                if (!err) {
                    authorizationPromise.resolve('access level set');
                } else {
                    authorizationPromise.reject('no access level found!');
                }
            });

        } else {
            authorizationPromise.reject('no access level found!');
        }
        return authorizationPromise.promise;
    }

    function checkAuthorization(req, res, next) {
        var token = req.token;
        var resource = req.url;
        var action = (req.method || '').toLowerCase();

        acl.isAllowed(token, resource, action, function(err, result) {
            if (result) {
                next();
            } else {
                var checkError = new Error('User does not have permission to perform this action.');
                next(checkError);
            }
        });
    }

    return {
        authorize: authorize,
        authorization: checkAuthorization
    };
}

module.exports = authorization;
