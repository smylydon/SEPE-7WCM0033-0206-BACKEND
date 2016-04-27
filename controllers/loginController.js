var jwt = require('jsonwebtoken');

var loginController = function(Person, authorization) {

    var login = function(req, res) {
        var user = new Object(req.body);

        function authorizationFailed() {
            res.status(403).json({
                success: false,
                message: 'Authorization failed'
            });
        }

        Person.findOne({
            where: {email: user.email, password: user.password}
        }).then(function(newUser) {
            var token = null;
            if (newUser) {
                user.password = '';
                token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiredsInMinutes: 1440
                });
                authorization.authorize(user.email, newUser.authorization).then(function(accessLevel) {
                    res.status(200).json({
                        success: true,
                        message: 'Authorization success',
                        token: token,
                        accessLevel: accessLevel
                    });
                }).catch(function(error) {
                    authorizationFailed();
                });

            } else {
                authorizationFailed();
            }
        }).catch(function(err) {
            res.status(500).json({
                success: false,
                message: 'Error occurred:' + err
            });
        });
    };

    var logout = function(req, res) {
        var user = new Object(req.body);
    };

    return {
        login: login
    };
};

module.exports = loginController;
