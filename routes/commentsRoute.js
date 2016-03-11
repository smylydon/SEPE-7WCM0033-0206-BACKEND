function commentsRoute(setter, Comment) {
    var commentsController = require('../controllers/commentsController')(Comment);
    var authenticationRouter = setter.authenticationRouter;
    var authentication = setter.authentication;
    var authorization = setter.authorization;

    authenticationRouter.route('/comments')
      .get(authentication,commentsController.commentsGetAll);

    authenticationRouter.route('/comments')
      .post(commentsController.commentsPost);

    authenticationRouter.route('/comments/:id')
      .get(commentsController.commentsGet);

    authenticationRouter.route('/comments')
      .put(commentsController.commentsPut);

    authenticationRouter.route('/comments/:id')
      .delete(commentsController.commentsDelete);
}

module.exports = commentsRoute;
