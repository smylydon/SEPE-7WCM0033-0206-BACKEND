var _ = require('lodash');

var carsController = function(models) {
    var message = '';
    var request, response;
    var Car = models.Car;
    var CarsImages = models.CarsImages;
    var Images = models.Image;
    var Make = models.Make;

    function success(car) {
        if (car) {
            response.status(200)
            .json(car);
        } else {
            var error = {
                success: false,
                message: message
            };
            response.status(404)
            .json(error);
        }
    }

    function error(err) {
        var error = {
            success: false,
            message: 'Error occurred:' + message
        };

        response.status(500)
        .json(error);
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
            },
            include: [{
                model: Make
            }, {
                model: Images //uses through relation
            }]
        })
        .then(success)
        .catch(error);
    }

    function retrieveModels(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve car models.';

        Car.findAll({
            where: {
                make_id: req.params.id
            },
            attributes: ['id', 'model']
        })
        .then(success)
        .catch(error);
    }

    function retrieveYears(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve car years.';

        Car.findAll({
            where: {
                make_id: req.params.id
            },
            attributes: ['year']
        })
        .then(success)
        .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res);
        var query = req.query;
        var clauses = {
            where: {},
            limit: 10,
            order: [
            ['id', 'ASC']
            ],
            include: [{
                model: Make
            }, {
                model: Images //uses through relation
            }]
        };

        if (!query) {
            query = {
                offset: 0,
                limit: 10
            };
        }
        var makeId = parseInt(query.makeId) || 0;
        var model = query.model || '';

        if (makeId > 0) {
            clauses.where.make_id = makeId;
        }
        if (_.isString(model) && model.length > 0) {
            clauses.where.model = model;
        }
        var limit = (parseInt(query.limit) || 10);
        var offset = (parseInt(query.offset) || 0) * 10;
        offset = Math.max(offset, 0);
        limit = Math.max(limit, 1);
        limit = Math.min(limit, 20);
        clauses.offest = offset;
        clauses.limit = limit;
        message = 'Failed to retrieve cars.';

        Car.findAndCountAll(clauses)
        .then(success)
        .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res);
        var car = new Object(req.body);
        message = 'Failed to update car.';
        Car.update(car, {
            where: {
                id: req.params.id
            }
        })
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
        setRequestResponse(req, res);
        message = 'Failed to save uploaded image.';
        var anImage = {};
        var file = req.file;

        if (file) {
            file.path = file.path.replace('public/', '/');
            Images.create(file)
				.then(function(image) {
    anImage = image;
    return Car.findById(req.body.car_id);
				})
				.then(function(car) {
    return CarsImages.create({
        image_id: anImage.id,
        car_id: car.id
    });
				})
				.then(success)
				.catch(error);
        } else {
            error();
        }
    }

    return {
        carsPost: createOne,
        carsGetAll: retrieveAll,
        carsGet: retrieveOne,
        carsPut: updateOne,
        carsDelete: deleteOne,
        carsGetModels: retrieveModels,
        carsGetYears: retrieveYears,
        carsUploadPixPost: uploadPix
    };
};

module.exports = carsController;
