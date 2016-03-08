function carsRoute(authenticationRouter, Car) {
    var carsController = require('../controllers/carsController')(Car);
    authenticationRouter.route('/cars')
      .get(carsController.carsGetAll);

    authenticationRouter.route('/cars')
      .post(carsController.carsPost);

    authenticationRouter.route('/cars/:id')
      .get(carsController.carsGet);

    authenticationRouter.route('/cars')
      .put(carsController.carsPut);

    authenticationRouter.route('/cars/:id')
      .delete(carsController.carsDelete);
}

module.exports = carsRoute;
