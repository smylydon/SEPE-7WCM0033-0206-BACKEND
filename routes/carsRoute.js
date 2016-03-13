function carsRoute(setter, Car) {
    var carsController = require('../controllers/carsController')(Car);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;

    router.route('/cars')
      .get(carsController.carsGetAll);

    router.route('/cars')
      .post(authentication, carsController.carsPost);

    router.route('/cars/:id')
      .get(carsController.carsGet);

    router.route('/cars')
      .put(authentication, carsController.carsPut);

    router.route('/cars/:id')
      .delete(authentication, carsController.carsDelete);
}

module.exports = carsRoute;
