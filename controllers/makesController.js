var makesController = function(Make) {
    var message = '';
    var request, response;

    function success(make) {
        if (make) {
            response.status(200)
            .json(make);
        } else {
            response.status(404)
				.json({
    success: false,
    message: message
				});
        }
    }

    function error(err) {
        var error = 'Error occurred:' + message;
        response.status(500)
			.json({
    success: false,
    message: error
			});
    }

    function setRequestResponse(req, res) {
        request = req;
        response = res;
    }

    function createOne(req, res) {
        setRequestResponse(req, res);
        var make = new Object(req.body);
        message = 'Failed to save make.';
        Make.create(make)
        .then(success)
        .catch(error);
    }

    function retrieveOne(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve make';
        Make.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(success)
        .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve make.';
        Make.findAll({})
        .then(success)
        .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res);
        var make = new Object(req.body);
        message = 'Failed to update make.';
        Make.update(make)
        .then(success)
        .catch(error);
    }

    function deleteOne(req, res) {
        setRequestResponse(req, res);
        var make = new Object(req.body);
        message = 'Failed to delete make.';
        Make.destroy(make)
        .then(success)
        .catch(error);
    }

    return {
        makesPost: createOne,
        makesGetAll: retrieveAll,
        makesGet: retrieveOne,
        makesPut: updateOne,
        makesDelete: deleteOne
    };
};

module.exports = makesController;
