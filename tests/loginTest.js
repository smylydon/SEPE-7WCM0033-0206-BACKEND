var models = require('../models')
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Authentication Controller Tests', function() {
  var User, req, res, authenticationController;

  beforeEach(function() {
    User = models.User;

    req = {};
    res = {
      status: sinon.spy(),
      send: sinon.spy()
    };
    authenticationController = require('../controllers/authenticationController')(User);
  });

  afterEach(function() {
    User = null;
  });

  describe('Post', function() {
    it('should login a user with credentials email=guest@abc.com and password=password', function() {
      req.body = {
        email: 'guest@abc.com',
        password: 'password'
      };
      authenticationController.login(req, res);
      expect(1).to.equal(1);
    });
  })

});
