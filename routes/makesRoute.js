function makesRoute(setter, Make) {
    var makesController = require('../controllers/makesController')(Make);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;

    router.route('/makes')
      .get(makesController.makesGetAll);

    router.route('/makes')
      .post(makesController.makesPost);

    router.route('/makes/:id')
      .get(makesController.makesGet);

    router.route('/makes')
      .put(makesController.makesPut);

    router.route('/makes/:id')
      .delete(makesController.makesDelete);
}

module.exports = makesRoute;
