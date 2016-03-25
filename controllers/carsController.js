
var carsController = function(Car, Make) {
    var message = '';
    var request, response;

    function success(car) {
        if (car) {
            response.status(200)
            .json(car);
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
        var car = new Object(req.body);
        message = 'Failed to save car.';
        Car.create(car)
        .then(success)
        .catch(error);
    }

    function retrieveOne(req, res) {
        setRequestResponse(req, res);
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
        setRequestResponse(req, res);
        var query = req.query;
        if (!query) {
            query = {
                offset: 0,
                limit: 5
            };
        }
        message = 'Failed to retrieve cars.';
        Car.findAndCountAll({
            offset: parseInt(query.offset) * 5,
            limit: 5
        })
        .then(success)
        .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res);
        var car = new Object(req.body);
        message = 'Failed to update car.';
        Car.update(car)
        .then(success)
        .catch(error);
    }

    function deleteOne(req, res) {
        setRequestResponse(req, res);
        var car = new Object(req.body);
        message = 'Failed to delete car.';
        Car.destroy(car)
        .then(success)
        .catch(error);
    }

    function uploadPix(req, res) {
        //console.log('upload ready:', req.file, req.body.car_id);
        var message = 'image uploaded successfully';
        res.status(200)
        .json({
            success: true,
            message: message
        });
    }

    return {
        carsPost: createOne,
        carsGetAll: retrieveAll,
        carsGet: retrieveOne,
        carsPut: updateOne,
        carsDelete: deleteOne,
        carsUploadPixPost: uploadPix
    };
};

module.exports = carsController;
