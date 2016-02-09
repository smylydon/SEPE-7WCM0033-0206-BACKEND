var _ = require("lodash-node");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Sequelize = require('sequelize');
var app = express();

var port = process.env.PORT || 3001;
var User = require('./models/User');
console.log('MONGO_URL:', process.env.MONGO_URL);
// Connnect to DB.
mongoose.connect(process.env.MONGO_URL);
sequelize = new Sequelize('mydb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Person = sequelize.define('person', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  dob: Sequelize.DATE,
  sex: Sequelize.STRING
}, {
  paranoid: true,
  underscored: true
});
var pgUser = sequelize.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
}, {
  paranoid: true,
  underscored: true
});
Person.findOne().then(function(person) {
  console.log('found person: ', person.first_name);
});
pgUser.findOne().then(function(user) {
  console.log('found user: ', user);
});
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

var authenticationRouter = require('./routes/authentication')(User);

app.use('/api', authenticationRouter);

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.listen(port, function() {
  console.log(" Express server listening on port " + port);
})
