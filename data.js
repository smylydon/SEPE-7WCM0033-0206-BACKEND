var models = require('./models');
var insertMakes = require('./insertMakes');

var sequelize = models.sequelize;

var users = [{
    email: 'guest@abc.com',
    password: 'password'
}, {
    email: 'fred@mailinator.com',
    password: 'x'
}, {
    email: 'wilma@mailinator.com',
    password: 'x'
}, {
    email: 'pebbles@mailinator.com',
    password: 'x'
}, {
    email: 'bambam@mailinator.com',
    password: 'x'
}];

var comments = [{
    'name': 'Guest User',
    email: 'guest@abc.com',
    subject: 'Test',
    message: 'Testing test'
}, {
    'name': 'Fred Flintstone',
    email: 'fred@mailinator.com',
    subject: 'Testing',
    message: 'This is cool'
}];

function insertComments() {
    var aComment = comments.shift();
    Comment = models.Comment;
    Comment.create(aComment)
        .then(function(comment) {
            if (comments.length) {
                insertComments();
            } else {
                insertMakes();
            }
        });
}

function insertUsers() {
    var aUser = users.shift();
    User = models.User;
    User.create(aUser)
        .then(function(user) {
            if (users.length > 0) {
                insertUsers();
            } else if (comments.length > 0) {
                insertComments();
            }
        });
}

function insertData() {
    sequelize.sync({
            force: true
        })
        .then(function(sequelize) {
            insertUsers();
        }).catch(function(error) {
            throw Error(error);
        });

}

module.exports = insertData;
