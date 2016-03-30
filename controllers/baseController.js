var _ = require('lodash');

var BaseController = {
    _name: null,
    Model: null,
    message: '',
    request: null,
    response: null,
    limit: 5,

    extend: function(child) {
        return _.extend({}, this, child);
    },

    success: function(result) {
        if (result) {
            this.response.status(200)
            .json(result);
        } else {
            this.response.status(404)
				.json({
    success: false,
    message: message
				});
        }
    },

    error: function(err) {
        var error = 'Error occurred:' + this.message;
        this.response.status(500)
			.json({
    success: false,
    message: error
			});
    },

    setRequestResponse: function(req, res) {
        this.request = req;
        this.response = res;
    },

    createOne: function(req, res) {
        this.setUpVariables('save', req, res);
        this.write('create');
    },

    retrieveOne: function(req, res) {
        this.setUpVariables('retrieve', req, res);

        this.read('findOne', {
            where: {
                id: req.params.id
            }
        });
    },

    retrieveAll: function(req, res) {
        this.setUpVariables('find', req, res);
        var query = req.query;
        if (!query) {
            query = {
                offset: 0,
                limit: this.limit
            };
        }

        this.read('findAndCountAll', {
            offset: parseInt(query.offset) * this.limit,
            limit: this.limit
        });
    },

    read: function(action, model) {
        this.Model[action](model)
        .then(this.success)
        .catch(this.error);
    },

    write: function(action) {
        var model = new Object(this.request.body);
        this.Model[action](model)
        .then(this.success)
        .catch(this.error);
    },

    updateOne: function(req, res) {
        this.setUpVariables('update', req, res);
        this.write('update');
    },

    deleteOne: function(req, res) {
        this.setUpVariables('delete', req, res);
        this.write('destroy');
    },

    setUpVariables: function(action, req, res) {
        this.message = 'Failed to ' + action + ' ' + this._name + '.';
        this.setRequestResponse(req, res);
    }
};

module.exports = BaseController;
