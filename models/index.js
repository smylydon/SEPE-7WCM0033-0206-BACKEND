var _ = require('lodash-node');
var config = require('../config/config');
var Sequelize = require('sequelize');
var models = [
    'Car',
    'Country',
    'Comment',
    'Image',
    'Licence',
    'Make',
    'Manufacturer',
    'Part',
    'Payment',
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
    m.Part.hasMany(m.Manufacturer);
    m.User.belongsTo(m.Person);
    m.Sale.belongsTo(m.Payment);

    m.Car.belongsToMany(m.Image, {
        through: 'carsImages'
    });
    m.Image.belongsToMany(m.Car, {
        through: 'carsImages'
    });

    m.Part.belongsToMany(m.Image, {
        through: 'partsImages'
    });
    m.Image.belongsToMany(m.Part, {
        through: 'partsImages'
    });

    m.Licence.belongsToMany(m.Image, {
        through: 'licencesImages'
    });
    m.Image.belongsToMany(m.Licence, {
        through: 'licencesImages'
    });

    module.exports.CarsImages = sequelize.models.carsImages;
    module.exports.PartsImages = sequelize.models.partsImages;
    module.exports.LicencesImages = sequelize.models.licencesImages;

})(module.exports);

console.log('=========== Database is:', serverName);

//sequelize.sync();

//Export sequelize
module.exports.sequelize = sequelize;
