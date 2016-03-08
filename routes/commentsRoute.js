function commentsRoute(authenticationRouter, Comment) {
    var commentsController = require('../controllers/commentsController')(Comment);
    authenticationRouter.route('/comments')
      .get(commentsController.commentsGetAll);

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
