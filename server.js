var _ = require('lodash-node');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var authenitication = require('./authentication');
var authorization = require('./authorization');

var app = express();
var port = process.env.PORT || 3001;

app.set('views', path.join(__dirname + 'views'));
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));

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

var authenticationRouter = require('./routes/authentication')(app.get('models'), authenitication, authorization);
var sequelize = app.get('models').sequelize;

//sequelize.sync();

var insertData = require('./Data');

insertData();

app.use('/api', authenticationRouter);

process.on('uncaughtException', function(err) {
    console.log(err);
});

app.listen(port, function() {
    console.log(' Express server listening on port ' + port);
});

module.exports = app;
