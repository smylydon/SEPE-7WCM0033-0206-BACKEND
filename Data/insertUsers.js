var _ = require('lodash-node');
var randomstring = require('randomstring');
var models = require('./../models');
var insertMakes = require('./insertMakes');

var users = [{
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

var people = [{
    firstname: 'Frederick',
    lastname: 'Flintstone',
    sex: 'm'
},{
    firstname: 'Wilma',
    lastname: 'Flintstone',
    sex: 'f'
},{
    firstname: 'Pebbles',
    lastname: 'Flintstone',
    sex: 'f'
},{
    firstname: 'Barney',
    lastname: 'Rabble',
    sex: 'm'
},{
    firstname: 'Betty',
    lastname: 'Rabble',
    sex: 'f'
},{
    firstname: 'Bam-Bam',
    lastname: 'Rabble',
    sex: 'm'
},{
    firstname: 'Leonard',
    lastname: 'McCoy',
    sex: 'm'
},{
    firstname: 'James',
    lastname: 'Kirk',
    sex: 'm'
},{
    firstname: 'Spock',
    lastname: null,
    sex: 'm'
},{
    firstname: 'Diana',
    lastname: 'Prince',
    sex: 'f'
}];

function insertPeople() {
    var aPerson = people.shift();
    Person = models.Person;
    Person.create(aPerson)
        .then(function(person) {
            if (people.length > 0) {
                insertPeople();
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
            } else if (people.length > 0) {
                insertPeople();
            }
        });
}

module.exports = insertUsers;
