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
                attributes: ['model']
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
        if (!query) {
            query = {
                offset: 0,
                limit: 5
            };
        }
        message = 'Failed to retrieve cars.';
        Car.findAndCountAll({
                offset: (parseInt(query.offset) || 0) * 5,
                limit: 5,
                include: [{
                    model: Make
                }]
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
        setRequestResponse(req, res);
        message = 'Failed to save uploaded image.';
        var anImage = {};

        Images.create(req.file)
            .then(function(image) {
                anImage = image;
                console.log('now getting car');
                return Car.findById(req.body.car_id);
            })
            .then(function(car) {
                console.log('got image:', anImage.id, car.id);
                return CarsImages.create({
                  image_id: anImage.id,
                  car_id: car.id
              });
            })
            .then(success)
            .catch(error);
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
