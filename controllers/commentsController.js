var jwt = require('jsonwebtoken');

var commentsController = function(Comment) {
    var message = '';
    var request, response;

    function success(comment) {
        if (comment) {
            response.status(200)
              .json(comment);
        } else {
            response.status(403)
        .json({
            success: false,
            message: message
        });
        }
    }

    function error(err) {
        response.status(500).json({
            success: false,
            message: 'Error occurred:' + message
        });
    }

    function setRequestResponse(req, res) {
        request = req;
        response = res;
    }

    function createOne(req, res) {
        setRequestResponse(req, res);
        var comment = new Object(req.body);
        message = 'Failed to save comment.';
        Comment.create(comment)
          .then(success)
          .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve comments.';
        Comment.findAll({})
          .then(success)
          .catch(error);
    }

    function retrieveOne(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve comment.';
        Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(success)
        .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res);
        var comment = new Object(req.body);
        message = 'Failed to update comment.';
        Comment.save(comment)
            .then(success)
            .catch(error);
    }

    function deleteOne(req, res) {
        setRequestResponse(req, res);
        var comment = new Object(req.body);
        message = 'Failed to delete comment.';
        Comment.destroy(comment)
            .then(success)
            .catch(error);
    }

    return {
        commentsPost: createOne,
        commentsGetAll: retrieveAll,
        commentsGet: retrieveOne,
        commentsPut: updateOne,
        commentsDelete: deleteOne
    };
};

module.exports = commentsController;
