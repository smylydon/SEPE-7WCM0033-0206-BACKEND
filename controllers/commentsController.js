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
            message: 'Error occurred:' + err
        });
    }

    var get = function(req, res) {
        request = req;
        response = res;
        if (req.boddy) {
            getOne(req, res);
        } else {
            getAll(req, res);
        }
    };

    var getAll = function(req, res) {
        message = 'Failed to retrieve comments';
        Comment.findAll({})
            .then(success)
            .catch(error);
    };

    var getOne = function(req, res) {
        var comment = new Object(req.body);
        message = 'Failed to retrieve comment';
        Comment.findOne({
                where: comment
            })
            .then(success)
            .catch(error);
    };

    var save = function(req, res) {
        var comment = new Object(req.body);
        message = 'Failed to save comment.';
        request = req;
        response = res;
        Comment.create(comment)
            .then(success)
            .catch(error);
    };

    return {
        commentPost: save,
        commentGet: get
    };
};

module.exports = commentsController;
