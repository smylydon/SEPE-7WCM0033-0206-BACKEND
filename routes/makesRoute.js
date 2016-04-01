function makesRoute(setter, Make) {
    var makesController = require('../controllers/makesController')(Make);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/makes')
    .get(makesController.makesGetAll);

    router.route('/makes')
    .post(authentication, authorization, makesController.makesPost);

    router.route('/makes/:id')
    .get(makesController.makesGet);

    router.route('/makes')
    .put(authentication, authorization, makesController.makesPut);

    router.route('/makes/:id')
    .delete(authentication, authorization, makesController.makesDelete);
}

module.exports = makesRoute;
