var _ = require('lodash-node');
var config = require('../config/config');
var Sequelize = require('sequelize');
var models = [
    'Car',
    'Country',
    'Comment',
    'Image',
    'Make',
    'Manufacturer',
    'Part',
    'Paymentmethod',
    'Person',
    'Sale',
    'User'
];
var serverName = process.env.serverName || 'test';
var configuration = config[serverName];
var database = configuration.database;

//connect to database using sequelize
var sequelize = new Sequelize(
    database.name, database.user,
    database.password,
    database.settings
);

//Export models
_.forEach(models, function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
    m.Car.belongsTo(m.Make);
    m.Part.belongsTo(m.Manufacturer);
    m.User.belongsTo(m.Person);
    m.Sale.belongsTo(m.Paymentmethod);
})(module.exports);

//sequelize.sync();

//Export sequelize
module.exports.sequelize = sequelize;
