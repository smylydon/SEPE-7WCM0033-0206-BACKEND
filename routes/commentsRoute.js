function commentsRoute(setter, Comment) {
    var commentsController = require('../controllers/commentsController')(Comment);
    var router = setter.router;
    var authentication = setter.authentication;
    var authorization = setter.authorization.authorization;

    router.route('/comments')
      .get(authentication, authorization, commentsController.commentsGetAll);

    router.route('/comments')
      .post(commentsController.commentsPost);

    router.route('/comments/:id')
      .get(authentication, authorization, commentsController.commentsGet);

    router.route('/comments')
      .put(authentication, authorization, commentsController.commentsPut);

    router.route('/comments/:id')
      .delete(authentication, authorization, commentsController.commentsDelete);
}

module.exports = commentsRoute;
