function loginRoute(setter, Person) {
    var loginController = require('../controllers/loginController')(Person,setter.authorization);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/login')
        .post(loginController.login);

}

module.exports = loginRoute;
