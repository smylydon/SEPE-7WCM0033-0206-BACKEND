function loginRoute(setter, User) {
    var loginController = require('../controllers/loginController')(User,setter.authorization);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/login')
        .post(loginController.login);

}

module.exports = loginRoute;
