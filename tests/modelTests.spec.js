var models = require('../models');
var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();
var sequelize = models.sequelize;

chai.use(chaiAsPromise);

process.env.serverName = 'test';

describe('sequelize Model Tests', function() {
    var User, aUser;
    var Comment, aComment;

    //Clean the database once.
    before(function(done) {
        //drop and recreate tables from models
        sequelize.sync({
                force: true
            })
            .then(function(sequelize) {
                done();
            }).catch(function(error) {
                throw Error(error);
            })
    });

    describe('User Model', function() {

        beforeEach(function() {
            aUser = {
                email: 'guest@abc.com',
                password: 'password'
            };
            User = models.User;
        });

        afterEach(function() {
            User = null;
            aUser = null;
        });

        it('should not find a user with credentials email=guest@abc.com and password=password', function(done) {
            User.findOne({
                where: aUser
            }).then(function(user) {
                expect(user).to.equal(null);
                done();
            }).catch(function(error) {
                expect(true).to.be.true;
                done();
            });
        });

        it('should create a user with credentials email=guest@abc.com and password=password', function(done) {
            User.create(aUser)
                .then(function(user) {
                    expect(user).to.not.equal(null);
                    expect(user.email).to.equal('guest@abc.com');
                    expect(user.password).to.equal('password');
                    done();
                });
        });

        it('should find a user with credentials email=guest@abc.com and password=password', function(done) {
            User.findOne({
                where: aUser
            }).then(function(user) {
                expect(user.email).to.equal('guest@abc.com');
                expect(user.password).to.equal('password');
                done();
            });
        });

    });

    describe('Comment Model', function() {

        beforeEach(function() {
            aComment = {
                'name': 'Guest User',
                email: 'guest@abc.com',
                subject: 'Test',
                message: 'Testing test'
            };
            Comment = models.Comment;
        });

        afterEach(function() {
            User = null;
            aUser = null;
        });

        it('should not find any comments', function(done) {
            Comment.findAll().then(function(comments) {
                expect(comments).to.equal(null);
                done();
            }).catch(function(error) {
                expect(true).to.be.true;
                done();
            });
        });

        it('should create a comment', function(done) {
            Comment.create(aComment)
                .then(function(comment) {
                    expect(comment).to.not.equal(null);
                    expect(comment.name).to.equal(aComment.name);
                    expect(comment.email).to.equal(aComment.email);
                    expect(comment.subject).to.equal(aComment.subject);
                    expect(comment.message).to.equal(aComment.message);
                    done();
                });
        });

        it('should find a comment', function(done) {
            Comment.findOne({
                where: aComment
            }).then(function(comment) {
                expect(comment).to.not.equal(null);
                expect(comment.name).to.equal(aComment.name);
                expect(comment.email).to.equal(aComment.email);
                expect(comment.subject).to.equal(aComment.subject);
                expect(comment.message).to.equal(aComment.message);
                done();
            });
        });

    });
});
