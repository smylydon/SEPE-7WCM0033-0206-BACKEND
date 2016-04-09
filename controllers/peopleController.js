
var peopleController = function(Person, User) {
    var message = '';
    var request, response;

    function success(person) {
        if (person) {
            response.status(200)
              .json(person);
        } else {
            response.status(404)
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
        var person = new Object(req.body);
        message = 'Failed to save person.';
        Person.create(person)
          .then(success)
          .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve people.';
        Person.findAndCountAll({
            offset: 0,
            limit: 10
        })
          .then(success)
          .catch(error);
    }

    function retrieveOne(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve person.';
        Person.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(success)
        .catch(error);
    }

    function updateOne(req, res) {
        setRequestResponse(req, res);
        var person = new Object(req.body);
        message = 'Failed to update person.';
        Person.update(person)
            .then(success)
            .catch(error);
    }

    function deleteOne(req, res) {
        setRequestResponse(req, res);
        var person = new Object(req.body);
        message = 'Failed to delete person.';
        Person.destroy(person)
            .then(success)
            .catch(error);
    }

    return {
        createOne: createOne,
        retrieveAll: retrieveAll,
        retrieveOne: retrieveOne,
        updateOne: updateOne,
        deleteOne: deleteOne
    };
};
/*
var BaseController = require('./baseController');
var peopleController = function(Person, User) {
    var baseController = BaseController({
        _name: 'people',
        Model: Person
    });

    function createOne() {
        baseController.createOne.apply(baseController, arguments);
    }

    function retrieveAll() {
        baseController.retrieveAll.apply(baseController, arguments);
    }

    function retrieveOne() {
        baseController.retrieveOne.apply(baseController, arguments);
    }

    function updateOne() {
        baseController.updateOne.apply(baseController, arguments);
    }

    function deleteOne() {
        baseController.deleteOne.apply(baseController, arguments);
    }

    return {
        createOne: createOne,
        retrieveAll: retrieveAll,
        retrieveOne: retrieveOne,
        updateOne: updateOne,
        deleteOne: deleteOne
    };
};
*/
module.exports = peopleController;
