function peopleRoute(setter, Person, User) {
    var peopleController = require('../controllers/peopleController')(Person, User);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/people')
      .get(authentication, authorization, peopleController.peopleGetAll);

    router.route('/people')
      .post(authentication, authorization, peopleController.peoplePost);

    router.route('/people/:id')
      .get(authentication, authorization, peopleController.peopleGet);

    router.route('/people')
      .put(authentication, authorization, peopleController.peoplePut);

    router.route('/people/:id')
      .delete(authentication, authorization, peopleController.peopleDelete);
}

module.exports = peopleRoute;
