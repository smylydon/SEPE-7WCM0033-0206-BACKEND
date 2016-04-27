var _ = require('lodash-node');
var Q = require('bluebird');
var ACL = require('acl');
var client = require('redis')
	.createClient(6379, '127.0.0.1', {
		no_ready_check: true
	});
var accessLevels = ['guest', 'administrator', 'manager', 'salesperson', 'guest'];

function authorization() {
	var acl = new ACL(new ACL.redisBackend(client, 'acl_'));
	//acl.addRoleParents('manager', ['administrator']);
	//acl.addRoleParents('salesperson', ['manager']);
	//acl.addRoleParents('guest', ['salesperson']);

	acl.allow([{
		roles: ['guest', 'salesperson', 'manager', 'administrator'],
		allows: [{
			resources: 'comments',
			permissions: ['post']
		}, {
			resources: 'cars',
			permissions: ['get']
		}]
	}]);

	acl.allow([{
		roles: ['salesperson', 'manager', 'administrator'],
		allows: [{
			resources: 'cars',
			permissions: ['put', 'post']
		}, {
			resources: 'comments',
			permissions: ['get', 'put', 'delete']
		}, {
			resources: 'people',
			permissions: ['get', 'put', 'post']
		}]
	}]);

	acl.allow([{
		roles: ['manager', 'administrator'],
		allows: [{
			resources: ['cars', 'makes', 'people'],
			permissions: ['delete']
		}]
	}]);

	acl.allow([{
		roles: ['administrator'],
		allows: [{
			resources: 'cars/uploadpix',
			permissions: ['delete', 'post', 'put']
		}]
	}]);

	function authorize(userId, level) {
		var access = accessLevels[level];
		var authorizationPromise = Q.defer();

		if (_.indexOf(accessLevels, access) >= 0) {
			acl.addUserRoles(userId, access, function (err) {
				if (!err) {
					authorizationPromise.resolve(access);
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
		var email = req.decoded.email;
		var resource = req.url;
		var action = (req.method || '')
			.toLowerCase();
		resource = resource.replace(/\//g, ' ')
			.replace(/\d+$/, '')
			.trim();
		acl.isAllowed(email, resource, action, function (err, result) {
			console.log('email, resource, action, result:', email, resource, action, result);
			//acl.allowedPermissions(email, function (err, roles) {
			//console.log('roles:', roles);
			//});
			if (result) {
				next();
			} else {
				var checkError = {
					success: false,
					message: 'User does not have permission to perform this action.'
				};
				res.status(403)
					.json(checkError);
			}
		});
	}

	function getAccessLevels() {
		return accessLevels;
	}

	function getAcl() {
		return acl;
	}

	return {
		authorize: authorize,
		authorization: checkAuthorization,
		getAccessLevels: getAccessLevels,
		getAcl: getAcl
	};
}

module.exports = authorization;
