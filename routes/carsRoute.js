function carsRoute(setter, Car) {
    var carsController = require('../controllers/carsController')(Car);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization;
    var uploads = setter.uploads;

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

    router.route('/cars/uploadpix')
      .post(uploads.single('photo'), carsController.carsUploadPixPost);
}

module.exports = carsRoute;
