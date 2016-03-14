var jwt = require('jsonwebtoken');

var loginController = function(User, authentication) {

    var login = function(req, res) {
        var user = new Object(req.body);

        function authenticationFail() {
            res.status(403).json({
                success: false,
                message: 'Authorization failed'
            });
        }

        User.findOne({
            where: {email: user.email, password: user.password}
        }).then(function(newUser) {
            var token = null;
            if (newUser) {
                token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiredsInMinutes: 1440
                });
                authentication.authorize(token, 1).then(function() {
                    res.status(200).json({
                        success: true,
                        message: 'Authorization success',
                        token: token
                    });
                }).catch(function(error) {
                    authenticationFail();
                });

            } else {
                authenticationFail();
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
