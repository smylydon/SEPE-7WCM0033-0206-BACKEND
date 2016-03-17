
var peopleController = function(Person, User) {
    var message = '';
    var request, response;

    function success(person) {
        if (person) {
            response.status(200)
              .json(person);
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
        var person = new Object(req.body);
        message = 'Failed to save person.';
        Person.create(person)
          .then(success)
          .catch(error);
    }

    function retrieveAll(req, res) {
        setRequestResponse(req, res);
        message = 'Failed to retrieve people.';
        Person.findAll({})
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
        peoplePost: createOne,
        peopleGetAll: retrieveAll,
        peopleGet: retrieveOne,
        peoplePut: updateOne,
        peopleDelete: deleteOne
    };
};

module.exports = peopleController;
