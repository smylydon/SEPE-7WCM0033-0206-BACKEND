function peopleRoute(setter, Person) {
    var peopleController = require('../controllers/peopleController')(Person);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/people')
      .get(authentication, authorization, peopleController.retrieveAll);

    router.route('/people')
      .post(authentication, authorization, peopleController.createOne);

    router.route('/people/:id')
      .get(authentication, authorization, peopleController.retrieveOne);

    router.route('/people')
      .put(authentication, authorization, peopleController.updateOne);

    router.route('/people/:id')
      .delete(authentication, authorization, peopleController.deleteOne);
}

module.exports = peopleRoute;
