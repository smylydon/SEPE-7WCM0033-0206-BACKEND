var models = require('./../models');
var insertPeople = require('./insertUsers');
var sequelize = models.sequelize;

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
    var Comment = models.Comment;

    Comment.create(aComment)
        .then(function(comment) {
            if (comments.length) {
                insertComments();
            } else {
                insertPeople();
            }
        });
}

function insertData() {
    sequelize.sync({
            force: true
        })
        .then(function(sequelize) {
          insertComments();
        }).catch(function(error) {
            throw Error(error);
        });

}

module.exports = insertData;
