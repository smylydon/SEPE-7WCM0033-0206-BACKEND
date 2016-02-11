var _ = require("lodash-node");
var Sequelize = require('sequelize');
var models = [
  'User'
];

//connect to database using sequelize
var sequelize = new Sequelize('mydb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

//Export models
_.forEach(models, function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

//Export sequelize
module.exports.sequelize = sequelize;