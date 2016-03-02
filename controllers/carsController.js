var jwt = require('jsonwebtoken');

var carsController = function(Car) {
    var message = '';
    var request, response;

    function success(car) {
        if (car) {
            response.status(200)
                .json(car);
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

    function setRequestResponse(req, res) {
        request = req;
        response = res;
    }

    function createOne(req, res) {
        setRequestResponse(req, res)
        var car = new Object(req.body);
        message = 'Failed to save car.';
        Car.create(car)
            .then(success)
            .catch(error);
    }

    function retrieveOne(req, res) {
        setRequestResponse(req, res)
        var car = new Object(req.body);
        message = 'Failed to retrieve car';
        Car.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(success)
            .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res)
        message = 'Failed to retrieve cars.';
        Car.findAll({})
            .then(success)
            .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res)
        var car = new Object(req.body);
        message = 'Failed to update car.';
        Car.save(car)
            .then(success)
            .catch(error);
    }

    function deleteOne(req, res) {
        setRequestResponse(req, res)
        var car = new Object(req.body);
        message = 'Failed to delete car.';
        Car.destroy(car)
            .then(success)
            .catch(error);
    }

    return {
        carsPost: createOne,
        carsGetAll: retrieveAll,
        carsGet: retrieveOne,
        carsPut: updateOne,
        carsDelete: deleteOne
    };
};

module.exports = carsController;
