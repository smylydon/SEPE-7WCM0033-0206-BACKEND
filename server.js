var _ = require("lodash-node");
var path = require("path");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3001;

app.set('views', path.join(__dirname + 'views'));
app.set('view engine', 'html');

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

app.set('models', require('./models'));

var authenticationRouter = require('./routes/authentication')(app.get('models'));

app.use('/api', authenticationRouter);

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.listen(port, function() {
  console.log(" Express server listening on port " + port);
});

module.exports = app;
