function carsRoute(setter, Car, Make) {
    var carsController = require('../controllers/carsController')(Car, Make);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;
    var uploads = setter.uploads;

    router.route('/cars')
    .get(carsController.carsGetAll);

    router.route('/cars')
    .post(authentication, authorization, carsController.carsPost);

    router.route('/cars/:id')
    .get(carsController.carsGet);

    router.route('/cars/models/:id')
    .get(carsController.carsGetModels);

    router.route('/cars/years/:id')
    .get(carsController.carsGetYears);

    router.route('/cars')
    .put(authentication, authorization, carsController.carsPut);

    router.route('/cars/:id')
    .delete(authentication, authorization, carsController.carsDelete);

    router.route('/cars/uploadpix')
    .post(authentication, authorization, uploads.single('photo'), carsController.carsUploadPixPost);
}

module.exports = carsRoute;
